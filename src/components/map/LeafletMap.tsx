"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { BASE_MAP, TILES } from "@/lib/map/config";
import { markerHtml } from "./glyphs";
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
const escapeHtml = (t: string) => t.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c] as string);

/** Glyph marker for every non-region type. See glyphs.ts for what the outline and tick mean. */
function pinIcon(type: PublicPin["type"], selected: boolean, approximate: boolean, source: PublicPin["source"]): L.DivIcon {
  const key = `${type}-${selected}-${approximate}-${source}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: `lvg-pin${selected ? " lvg-pin--selected" : ""}${approximate ? " lvg-pin--approx" : ""}`,
      html: markerHtml(type, { approximate, source }),
      iconSize: [28, 37],
      iconAnchor: [14, 36],
      tooltipAnchor: [0, -33],
    });
    iconCache.set(key, icon);
  }
  return icon;
}

/**
 * Region pins are label chips, not dots. They sit below the label that is baked into the base image
 * (offset scales with zoom through --lvg-s, see ZoomState) so the two never overlap.
 */
function regionIcon(name: string, selected: boolean, approximate: boolean, tall: boolean): L.DivIcon {
  const key = `region-${name}-${selected}-${approximate}-${tall}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: `lvg-region${selected ? " lvg-region--selected" : ""}${approximate ? " lvg-region--approx" : ""}${tall ? " lvg-region--tall" : ""}`,
      html: `<span class="lvg-region__chip"><i aria-hidden="true"></i>${escapeHtml(name)}</span>`,
      // No fixed size: the container is exactly the chip, offset with CSS `translate` (see globals.css).
      iconSize: null as unknown as L.PointExpression,
    });
    iconCache.set(key, icon);
  }
  return icon;
}

function clusterIcon(count: number): L.DivIcon {
  const key = `cluster-${count}`;
  let icon = iconCache.get(key);
  if (!icon) {
    const size = count > 20 ? 48 : count > 8 ? 42 : 36;
    icon = L.divIcon({
      className: "lvg-cluster",
      html: `<span>${count}</span>`,
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
    // While placing a pin, existing markers and clusters must not swallow the click.
    map.getContainer().classList.toggle("lvg-dropmode", enabled);
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
    <div className="pointer-events-none absolute bottom-6 left-3 z-[600] rounded bg-bg/90 px-2 py-1 font-mono text-[11px] text-orange" data-testid="coords">
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

/** Current zoom, rounded to the 0.25 snap, plus the "whole map" zoom. Also drives --lvg-s (see regionIcon). */
function useZoomState() {
  const map = useMap();
  const read = () => ({ zoom: Math.round(map.getZoom() * 4) / 4, fit: map.getMinZoom() });
  const [state, setState] = useState(read);
  useMapEvents({
    zoom() {
      // 1 at native resolution (1 source px = 1 screen px), 2 when overzoomed once, and so on.
      map.getContainer().style.setProperty("--lvg-s", String(2 ** (map.getZoom() - TILES.maxNativeZoom)));
    },
    zoomend() {
      setState(read());
    },
    resize() {
      setState(read());
    },
  });
  useEffect(() => {
    map.getContainer().style.setProperty("--lvg-s", String(2 ** (map.getZoom() - TILES.maxNativeZoom)));
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setState(read());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [map]);
  return state;
}

/**
 * Place pins appear once you are this many zoom levels past the whole-map view, capped at 40% of the
 * available zoom range (on a wide desktop window the whole map is already near native size, so the
 * range is under one level).
 */
const placesFrom = (fit: number) => Math.min(0.75, 0.4 * (TILES.maxZoom - fit));
/** Region label chips fade out once the baked-in labels are large enough to stand on their own. */
const REGIONS_UNTIL = 2.5;
/** Pins closer than this (screen px) merge into a cluster. */
const CLUSTER_PX = 44;

interface Cluster {
  pins: PublicPin[];
  x: number;
  y: number;
}

/** Greedy grid-free clustering in screen space at a given zoom. Cheap enough for thousands of pins. */
function clusterPins(map: L.Map, pins: PublicPin[], zoom: number, keepSingle: Set<string>): Cluster[] {
  const out: Cluster[] = [];
  const cell = CLUSTER_PX;
  const grid = new Map<string, Cluster[]>();
  for (const p of pins) {
    const pt = map.project(toLatLng(p.x, p.y), zoom);
    if (keepSingle.has(p.id)) {
      out.push({ pins: [p], x: pt.x, y: pt.y });
      continue;
    }
    const cx = Math.floor(pt.x / cell);
    const cy = Math.floor(pt.y / cell);
    let target: Cluster | null = null;
    for (let gx = cx - 1; gx <= cx + 1 && !target; gx++) {
      for (let gy = cy - 1; gy <= cy + 1 && !target; gy++) {
        for (const c of grid.get(`${gx}:${gy}`) ?? []) {
          if (Math.hypot(c.x - pt.x, c.y - pt.y) < cell) {
            target = c;
            break;
          }
        }
      }
    }
    if (target) {
      const n = target.pins.length;
      target.x = (target.x * n + pt.x) / (n + 1);
      target.y = (target.y * n + pt.y) / (n + 1);
      target.pins.push(p);
    } else {
      const c = { pins: [p], x: pt.x, y: pt.y };
      out.push(c);
      const k = `${cx}:${cy}`;
      grid.set(k, [...(grid.get(k) ?? []), c]);
    }
  }
  return out;
}

function PinLayer({
  pins,
  selectedId,
  onSelect,
  showAllPlaces,
  zoom,
  fit,
}: {
  pins: PublicPin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  showAllPlaces: boolean;
  zoom: number;
  fit: number;
}) {
  const map = useMap();
  const rel = zoom - fit;
  const placesVisible = showAllPlaces || rel >= placesFrom(fit);
  const regionsVisible = rel <= REGIONS_UNTIL;

  const regions = useMemo(() => pins.filter((p) => p.type === "region"), [pins]);
  const places = useMemo(() => pins.filter((p) => p.type !== "region"), [pins]);

  const clusters = useMemo(() => {
    if (!placesVisible) return [];
    const keep = new Set<string>(selectedId ? [selectedId] : []);
    // At full zoom everything is spread out enough; never hide pins behind a cluster there.
    if (zoom >= TILES.maxZoom - 0.01) return places.map((p) => ({ pins: [p], x: 0, y: 0 }));
    return clusterPins(map, places, zoom, keep);
  }, [map, places, zoom, placesVisible, selectedId]);

  return (
    <>
      {regionsVisible
        ? regions.map((p) => (
            <Marker
              key={p.id}
              position={toLatLng(p.x, p.y)}
              icon={regionIcon(p.name, p.id === selectedId, p.approximate, p.name === "Mount Kalaga")}
              eventHandlers={{ click: () => onSelect(p.id) }}
              keyboard={true}
              title={`${p.name} (region)`}
              zIndexOffset={p.id === selectedId ? 1000 : 0}
            />
          ))
        : null}
      {clusters.map((c) => {
        if (c.pins.length === 1) {
          const p = c.pins[0];
          return (
            <Marker
              key={p.id}
              position={toLatLng(p.x, p.y)}
              icon={pinIcon(p.type, p.id === selectedId, p.approximate, p.source)}
              eventHandlers={{ click: () => onSelect(p.id) }}
              keyboard={true}
              title={p.name}
              zIndexOffset={p.id === selectedId ? 1000 : 100}
            >
              <Tooltip direction="top" offset={[0, 0]} opacity={0.95}>
                {p.name}
              </Tooltip>
            </Marker>
          );
        }
        const center = map.unproject(L.point(c.x, c.y), zoom);
        const ids = c.pins.map((p) => p.id).join(",");
        return (
          <Marker
            key={`cluster-${ids}`}
            position={center}
            icon={clusterIcon(c.pins.length)}
            eventHandlers={{
              click: () => {
                const b = L.latLngBounds(c.pins.map((p) => toLatLng(p.x, p.y)));
                map.flyToBounds(b, { maxZoom: Math.min(TILES.maxZoom, zoom + 1.5), padding: [70, 70], duration: 0.5 });
              },
            }}
            keyboard={true}
            title={`${c.pins.length} places. Press Enter to zoom in.`}
            zIndexOffset={50}
          />
        );
      })}
    </>
  );
}

/** Overview hint: place pins are tucked away until you zoom in. */
function ZoomHint({ hiddenCount, show }: { hiddenCount: number; show: boolean }) {
  const map = useMap();
  if (!show || hiddenCount === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[7.5rem] z-[900] flex justify-center sm:bottom-10x">
      <button
        type="button"
        onClick={() => map.setZoom(map.getMinZoom() + Math.min(1.25, (TILES.maxZoom - map.getMinZoom()) * 0.6))}
        className="vc-chip vc-chip--on pointer-events-auto"
        style={{ ["--chip" as string]: "#00d4ff" }}
        data-testid="zoom-hint"
      >
        Zoom in to see {hiddenCount} more place{hiddenCount === 1 ? "" : "s"}
      </button>
    </div>
  );
}

function PinsAndHint(props: { pins: PublicPin[]; selectedId: string | null; onSelect: (id: string) => void; showAllPlaces: boolean }) {
  const { zoom, fit } = useZoomState();
  const placeCount = props.pins.filter((p) => p.type !== "region").length;
  return (
    <>
      <PinLayer {...props} zoom={zoom} fit={fit} />
      <ZoomHint hiddenCount={placeCount} show={!props.showAllPlaces && zoom - fit < placesFrom(fit)} />
    </>
  );
}

/** Legible attribution: our own base-map credit, a plain "Leaflet" link and no flag icon. */
function AttributionPrefix() {
  const map = useMap();
  useEffect(() => {
    map.attributionControl.setPrefix('<a href="https://leafletjs.com" target="_blank" rel="noopener">Leaflet</a>');
  }, [map]);
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
  showAllPlaces,
}: {
  pins: PublicPin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  dropMode: boolean;
  draft: { x: number; y: number } | null;
  onDraftChange: (p: { x: number; y: number }) => void;
  flyTarget: { x: number; y: number; key: number } | null;
  showCoords: boolean;
  /** Skip the zoom-dependent hiding of place pins (an active search or filter, or a deep link). */
  showAllPlaces: boolean;
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
      <PinsAndHint pins={pins} selectedId={selectedId} onSelect={onSelect} showAllPlaces={showAllPlaces} />
      <AttributionPrefix />
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
