"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { BASE_MAP, PIN_TYPES, TILES } from "@/lib/map/config";
import { fromSource, onBaseMap, toSource } from "@/lib/map/geo";
import type { PublicPin } from "@/lib/map/types";

/**
 * Deep-zoom map. The Leaflet coordinate space is the base image's source pixels
 * (lat = y from the top, lng = x from the left). At zoom = maxNativeZoom one source
 * pixel is one screen pixel, matching the tile pyramid from scripts/map-tiles.mjs.
 * Pins are stored in COORD_SPACE and converted through the manifest calibration.
 */
const f = 1 / 2 ** TILES.maxNativeZoom;
const CRS = L.Util.extend({}, L.CRS.Simple, { transformation: new L.Transformation(f, 0, f, 0) }) as L.CRS;
const BOUNDS = L.latLngBounds([0, 0], [TILES.height, TILES.width]);
const MAX_BOUNDS = BOUNDS.pad(0.08);

export const toLatLng = (x: number, y: number): L.LatLngTuple => {
  const { sx, sy } = toSource(x, y);
  return [sy, sx];
};
const fromLatLng = (ll: L.LatLng) => {
  const p = fromSource(ll.lng, ll.lat);
  return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
};

const iconCache = new Map<string, L.DivIcon>();
function pinIcon(type: PublicPin["type"], selected: boolean, approximate: boolean): L.DivIcon {
  const key = `${type}-${selected}-${approximate}`;
  let icon = iconCache.get(key);
  if (!icon) {
    const color = PIN_TYPES[type]?.color ?? "#ffd36b";
    const size = type === "region" ? 22 : 16;
    // Static markup only (colours from config); user text never goes into HTML.
    icon = L.divIcon({
      className: `lvg-pin${selected ? " lvg-pin--selected" : ""}${approximate ? " lvg-pin--approx" : ""}${type === "region" ? " lvg-pin--region" : ""}`,
      html: `<span style="--pin:${color}"></span>`,
      iconSize: [size, size],
      iconAnchor: [size / 2, size / 2],
    });
    iconCache.set(key, icon);
  }
  return icon;
}

const draftIcon = L.divIcon({
  className: "lvg-pin lvg-pin--draft",
  html: `<span></span>`,
  iconSize: [26, 26],
  iconAnchor: [13, 26],
});

/** Fits the whole map on load and keeps min zoom at "whole map visible" when the window resizes. */
/**
 * Start view: fill the window (no empty bands) when that crops little, otherwise zoom in at most one
 * level past "whole map". You can always zoom out to the whole map (minZoom = fit zoom), and the
 * "Whole map" button goes straight there.
 */
function startZoom(map: L.Map) {
  const fitZ = map.getBoundsZoom(BOUNDS, false);
  const coverZ = map.getBoundsZoom(BOUNDS, true);
  return { fitZ, start: Math.min(coverZ, fitZ + 1, TILES.maxZoom) };
}

function FitToView() {
  const map = useMap();
  useEffect(() => {
    let first = true;
    const fit = () => {
      map.invalidateSize();
      const { fitZ, start } = startZoom(map);
      map.setMinZoom(Math.min(fitZ, TILES.maxZoom));
      if (first) map.setView(BOUNDS.getCenter(), start, { animate: false });
      else if (map.getZoom() < fitZ) map.fitBounds(BOUNDS, { animate: false });
      first = false;
    };
    fit();
    const ro = new ResizeObserver(() => fit());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map]);
  return null;
}

function WholeMapButton() {
  const map = useMap();
  useEffect(() => {
    const Ctl = L.Control.extend({
      onAdd() {
        const a = L.DomUtil.create("a", "lvg-whole-map");
        a.href = "#";
        a.title = "Show the whole map";
        a.setAttribute("role", "button");
        a.setAttribute("aria-label", "Show the whole map");
        a.innerHTML = "&#x2922;";
        L.DomEvent.disableClickPropagation(a);
        L.DomEvent.on(a, "click", (e) => {
          L.DomEvent.preventDefault(e);
          map.flyToBounds(BOUNDS, { duration: 0.5 });
        });
        const wrap = L.DomUtil.create("div", "leaflet-bar leaflet-control");
        wrap.appendChild(a);
        return wrap;
      },
    });
    const ctl = new Ctl({ position: "bottomright" });
    ctl.addTo(map);
    return () => {
      ctl.remove();
    };
  }, [map]);
  return null;
}

function ClickToDrop({ enabled, onDrop }: { enabled: boolean; onDrop: (p: { x: number; y: number }) => void }) {
  const map = useMapEvents({
    click(e) {
      if (!enabled) return;
      const p = fromLatLng(e.latlng);
      if (!onBaseMap(p.x, p.y)) return;
      onDrop(p);
    },
  });
  useEffect(() => {
    map.getContainer().style.cursor = enabled ? "crosshair" : "";
  }, [enabled, map]);
  return null;
}

/** Calibration helper (?coords=1): shows pin coordinates and source pixels under the cursor. */
function CoordsReadout() {
  const [pos, setPos] = useState<{ x: number; y: number; sx: number; sy: number; z: number } | null>(null);
  const map = useMapEvents({
    mousemove(e) {
      const p = fromLatLng(e.latlng);
      setPos({ ...p, sx: Math.round(e.latlng.lng), sy: Math.round(e.latlng.lat), z: map.getZoom() });
    },
    zoomend() {
      setPos((p) => (p ? { ...p, z: map.getZoom() } : p));
    },
  });
  return (
    <div className="pointer-events-none absolute bottom-6 left-3 z-[600] rounded bg-[#0b0b0c]/90 px-2 py-1 font-mono text-[11px] text-[#ffd36b]" data-testid="coords">
      {pos ? `pin ${pos.x}, ${pos.y} · src ${pos.sx}, ${pos.sy} · z ${pos.z.toFixed(2)}` : "move the cursor over the map"}
    </div>
  );
}

function FlyTo({ target }: { target: { x: number; y: number; key: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.flyTo(toLatLng(target.x, target.y), Math.max(map.getZoom(), TILES.maxNativeZoom - 0.5), { duration: 0.6 });
  }, [target, map]);
  return null;
}

export default function LeafletMap({
  pins,
  selectedId,
  onSelect,
  dropMode,
  draft,
  onDraftChange,
  flyTarget,
  showCoords,
}: {
  pins: PublicPin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  dropMode: boolean;
  draft: { x: number; y: number } | null;
  onDraftChange: (p: { x: number; y: number }) => void;
  flyTarget: { x: number; y: number; key: number } | null;
  showCoords: boolean;
}) {
  const draftHandlers = useMemo(
    () => ({
      dragend(e: L.LeafletEvent) {
        onDraftChange(fromLatLng((e.target as L.Marker).getLatLng()));
      },
    }),
    [onDraftChange],
  );

  return (
    <MapContainer
      crs={CRS}
      bounds={BOUNDS}
      maxBounds={MAX_BOUNDS}
      maxBoundsViscosity={0.9}
      minZoom={0}
      maxZoom={TILES.maxZoom}
      zoomSnap={0.25}
      zoomDelta={0.5}
      wheelPxPerZoomLevel={90}
      wheelDebounceTime={20}
      zoomControl={false}
      attributionControl={true}
      className="lvg-map h-full w-full"
      style={{ background: TILES.background }}
    >
      <TileLayer
        url={TILES.urlTemplate}
        tileSize={TILES.tileSize}
        minNativeZoom={TILES.minNativeZoom}
        maxNativeZoom={TILES.maxNativeZoom}
        minZoom={-4}
        maxZoom={TILES.maxZoom}
        bounds={BOUNDS}
        noWrap
        keepBuffer={4}
        updateWhenZooming={false}
        attribution={BASE_MAP.attribution}
        className="lvg-tiles"
      />
      <ZoomControlBottomRight />
      <FitToView />
      <WholeMapButton />
      {pins.map((p) => (
        <Marker
          key={p.id}
          position={toLatLng(p.x, p.y)}
          icon={pinIcon(p.type, p.id === selectedId, p.approximate)}
          eventHandlers={{ click: () => onSelect(p.id) }}
          keyboard={true}
          title={p.name}
          zIndexOffset={p.id === selectedId ? 1000 : p.type === "region" ? 0 : 100}
        >
          <Tooltip direction="top" offset={[0, -8]} opacity={0.95}>
            {p.name}
          </Tooltip>
        </Marker>
      ))}
      {draft ? (
        <Marker position={toLatLng(draft.x, draft.y)} icon={draftIcon} draggable eventHandlers={draftHandlers} zIndexOffset={2000} />
      ) : null}
      <ClickToDrop enabled={dropMode} onDrop={onDraftChange} />
      <FlyTo target={flyTarget} />
      {showCoords ? <CoordsReadout /> : null}
    </MapContainer>
  );
}

function ZoomControlBottomRight() {
  const map = useMap();
  useEffect(() => {
    const zc = L.control.zoom({ position: "bottomright" });
    zc.addTo(map);
    return () => {
      zc.remove();
    };
  }, [map]);
  return null;
}
