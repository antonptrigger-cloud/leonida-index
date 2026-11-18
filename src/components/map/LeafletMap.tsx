"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { useEffect, useMemo } from "react";
import { ImageOverlay, MapContainer, Marker, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { BASE_MAP, PIN_TYPES } from "@/lib/map/config";
import type { PublicPin } from "@/lib/map/types";

const H = BASE_MAP.height;
const W = BASE_MAP.width;
const BOUNDS: L.LatLngBoundsExpression = [
  [0, 0],
  [H, W],
];
const MAX_BOUNDS: L.LatLngBoundsExpression = [
  [-H * 0.25, -W * 0.25],
  [H * 1.25, W * 1.25],
];

/** Image pixels (y from top) <-> Leaflet CRS.Simple lat/lng (lat from bottom). */
export const toLatLng = (x: number, y: number): L.LatLngTuple => [H - y, x];
const fromLatLng = (ll: L.LatLng) => ({ x: Math.round(ll.lng * 10) / 10, y: Math.round((H - ll.lat) * 10) / 10 });

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

function ClickToDrop({ enabled, onDrop }: { enabled: boolean; onDrop: (p: { x: number; y: number }) => void }) {
  const map = useMapEvents({
    click(e) {
      if (!enabled) return;
      const p = fromLatLng(e.latlng);
      if (p.x < 0 || p.y < 0 || p.x > W || p.y > H) return;
      onDrop(p);
    },
  });
  useEffect(() => {
    map.getContainer().style.cursor = enabled ? "crosshair" : "";
  }, [enabled, map]);
  return null;
}

function FlyTo({ target }: { target: { x: number; y: number; key: number } | null }) {
  const map = useMap();
  useEffect(() => {
    if (!target) return;
    map.flyTo(toLatLng(target.x, target.y), Math.max(map.getZoom(), 1), { duration: 0.6 });
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
}: {
  pins: PublicPin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  dropMode: boolean;
  draft: { x: number; y: number } | null;
  onDraftChange: (p: { x: number; y: number }) => void;
  flyTarget: { x: number; y: number; key: number } | null;
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
      crs={L.CRS.Simple}
      bounds={BOUNDS}
      maxBounds={MAX_BOUNDS}
      maxBoundsViscosity={0.8}
      minZoom={-2}
      maxZoom={3}
      zoomSnap={0}
      zoomDelta={0.5}
      attributionControl={true}
      className="lvg-map h-full w-full"
    >
      <ImageOverlay url={BASE_MAP.url} bounds={BOUNDS} attribution={BASE_MAP.attribution} />
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
    </MapContainer>
  );
}
