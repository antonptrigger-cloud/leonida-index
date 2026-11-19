"use client";

import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { createContext, useContext, useEffect, useId, useMemo, useRef, useState } from "react";
import { MapContainer, Marker, TileLayer, Tooltip, useMap, useMapEvents } from "react-leaflet";
import { BASES, DEFAULT_BASE, type BaseId, type BaseMap } from "@/lib/map/bases";
import type { TileManifest } from "@/lib/map/config";
import { markerHtml } from "./glyphs";
import { onBaseMap } from "@/lib/map/geo";
import { LABELS, LABEL_PRIORITY, type LabelKind, type MapLabel } from "@/lib/map/labels";
import { Occupancy, textWidth, type Rect } from "@/lib/map/label-layout";
import type { PublicPin } from "@/lib/map/types";

/**
 * Deep-zoom map. The Leaflet coordinate space is the base image's source pixels
 * (lat = y from the top, lng = x from the left). At zoom = maxNativeZoom one source
 * pixel is one screen pixel, matching the tile pyramid from scripts/map-tiles.mjs.
 * Pins are stored in COORD_SPACE and converted per base (src/lib/map/bases.ts).
 */
/** Everything that depends on which base map is showing. One instance per base, shared through context. */
interface Geo {
  base: BaseMap;
  tiles: TileManifest;
  crs: L.CRS;
  bounds: L.LatLngBounds;
  maxBounds: L.LatLngBounds;
  /** A stored pin (legacy pin space; its id selects a fixed art position when there is one) -> Leaflet position. */
  toLatLng: (p: { id?: string; x: number; y: number }) => L.LatLngTuple;
  /** Leaflet position -> stored pin coordinates (what a new submission saves). */
  fromLatLng: (ll: L.LatLng) => { x: number; y: number };
}

const geoCache = new Map<BaseId, Geo>();
function geoFor(id: BaseId): Geo {
  let g = geoCache.get(id);
  if (!g) {
    const base = BASES[id];
    const tiles = base.tiles;
    const f = 1 / 2 ** tiles.maxNativeZoom;
    const bounds = L.latLngBounds([0, 0], [tiles.height, tiles.width]);
    g = {
      base,
      tiles,
      crs: L.Util.extend({}, L.CRS.Simple, { transformation: new L.Transformation(f, 0, f, 0) }) as L.CRS,
      bounds,
      maxBounds: bounds.pad(0.08),
      toLatLng: (p) => {
        const { sx, sy } = base.pinToSource(p);
        return [sy, sx];
      },
      fromLatLng: (ll) => {
        const p = base.sourceToPin(ll.lng, ll.lat);
        return { x: Math.round(p.x * 10) / 10, y: Math.round(p.y * 10) / 10 };
      },
    };
    geoCache.set(id, g);
  }
  return g;
}
const GeoContext = createContext<Geo | null>(null);
const useGeo = () => {
  const g = useContext(GeoContext);
  if (!g) throw new Error("Geo context missing");
  return g;
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
function regionIcon(name: string, selected: boolean, approximate: boolean, tall: boolean, offset: boolean): L.DivIcon {
  const key = `region-${name}-${selected}-${approximate}-${tall}-${offset}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: `lvg-region${offset ? "" : " lvg-region--label"}${selected ? " lvg-region--selected" : ""}${approximate ? " lvg-region--approx" : ""}${tall ? " lvg-region--tall" : ""}`,
      html: `<span class="lvg-region__chip"><i aria-hidden="true"></i>${escapeHtml(name)}</span>`,
      // No fixed size: the container is exactly the chip, offset with CSS `translate` (see globals.css).
      iconSize: null as unknown as L.PointExpression,
    });
    iconCache.set(key, icon);
  }
  return icon;
}

/** District / region / water label: plain text with a dark halo, not interactive. `below` hangs it under its anchor pin. */
function labelIcon(kind: LabelKind, name: string, below: boolean): L.DivIcon {
  const key = `label-${kind}-${name}-${below}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: `lvg-label lvg-label--${kind}${below ? " lvg-label--below" : ""}`,
      html: `<span aria-hidden="true">${escapeHtml(name)}</span>`,
      iconSize: null as unknown as L.PointExpression,
    });
    iconCache.set(key, icon);
  }
  return icon;
}

/** Pin name next to its marker (z6+). `side` is which side of the marker head the text sits on. */
function pinNameIcon(name: string, side: "r" | "l"): L.DivIcon {
  const key = `pinname-${name}-${side}`;
  let icon = iconCache.get(key);
  if (!icon) {
    icon = L.divIcon({
      className: `lvg-pinname lvg-pinname--${side}`,
      html: `<span aria-hidden="true">${escapeHtml(name)}</span>`,
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
function startZoom(map: L.Map, geo: Geo) {
  const fitZ = map.getBoundsZoom(geo.bounds, false);
  const coverZ = map.getBoundsZoom(geo.bounds, true);
  return { fitZ, start: Math.min(coverZ, fitZ + 1, geo.tiles.maxZoom) };
}

/** Below this container width the layout is the phone one (full-width controls on top and bottom, no side panel). */
const NARROW_PX = 640;

/**
 * Pixels of the map covered by floating controls (elements marked `data-map-ui`), per edge. A control spanning most of the width is
 * a top or bottom bar (phone search card, submit button); a narrower one is a side panel (the desktop search/filter card), counted
 * from the edge it hangs off. Floors reserve what mounts after the first fit or lives outside `data-map-ui`: the zoom hint chip,
 * the zoom buttons and the attribution.
 */
function coveredEdges(map: L.Map): { top: number; bottom: number; left: number; right: number } {
  const el = map.getContainer();
  const c = el.getBoundingClientRect();
  const narrow = c.width < NARROW_PX;
  let top = 0;
  let bottom = 0;
  let left = 0;
  let right = 0;
  const host = el.closest("[data-map-host]") ?? document;
  host.querySelectorAll<HTMLElement>("[data-map-ui]").forEach((ui) => {
    const r = ui.getBoundingClientRect();
    if (r.width === 0 || r.height === 0) return;
    if (r.width > c.width * 0.6) {
      if (r.top + r.height / 2 < c.top + c.height / 2) top = Math.max(top, r.bottom - c.top);
      else bottom = Math.max(bottom, c.bottom - r.top);
    } else if (r.left + r.width / 2 < c.left + c.width / 2) left = Math.max(left, r.right - c.left);
    else right = Math.max(right, c.right - r.left);
  });
  return narrow
    ? { top: top || 120, bottom: Math.max(bottom, 188), left: 0, right: 0 }
    : { top: Math.max(top, 4), bottom: Math.max(bottom, 96), left, right: Math.max(right, 72) };
}

/**
 * Frame the whole island (Port Gellhorn to Vice City, Mount Kalaga to Leonida Keys) in the part of the map the floating controls
 * leave free: between the search card and the submit button on phones, right of the search/filter card on desktop.
 * Returns the zoom it chose, which becomes the lowest zoom the map may sit at.
 */
function frameIsland(map: L.Map, geo: Geo, box: NonNullable<BaseMap["startBox"]>, fitZ: number): number {
  const { top, bottom, left, right } = coveredEdges(map);
  // zoomSnap would round the fit down by up to a quarter level (a ~19% smaller island): fit exactly, then restore it.
  const snap = map.options.zoomSnap;
  map.options.zoomSnap = 0;
  map.setMinZoom(0);
  // maxBounds is smaller than the viewport at this zoom, which would re-centre the view and undo the padding.
  map.setMaxBounds(undefined as unknown as L.LatLngBounds);
  map.fitBounds(L.latLngBounds([box.y0, box.x0], [box.y1, box.x1]), {
    paddingTopLeft: [left ? left + 12 : 6, top + 8],
    paddingBottomRight: [right || 6, bottom + 8],
    animate: false,
  });
  map.options.zoomSnap = snap;
  map.setMaxBounds(L.latLngBounds(geo.maxBounds.getSouthWest(), geo.maxBounds.getNorthEast()).extend(map.getBounds()));
  const z = map.getZoom();
  map.setMinZoom(Math.min(fitZ, z, geo.tiles.maxZoom));
  return z;
}

function FitToView() {
  const map = useMap();
  const geo = useGeo();
  useEffect(() => {
    let first = true;
    // The island frame can be smaller than the whole-image fit (the controls eat room); never zoom out less than it.
    let floorZ = Infinity;
    const fit = () => {
      map.invalidateSize();
      const { fitZ, start } = startZoom(map, geo);
      const box = geo.base.startBox;
      const framed = first && !!box;
      // Raising minZoom above the current zoom would animate a zoom-in that fights the island frame below.
      if (!framed) map.setMinZoom(Math.min(fitZ, floorZ, geo.tiles.maxZoom));
      if (first) {
        if (framed && box) {
          floorZ = frameIsland(map, geo, box, fitZ);
        } else map.setView(geo.bounds.getCenter(), start, { animate: false });
      } else if (map.getZoom() < Math.min(fitZ, floorZ)) map.fitBounds(geo.bounds, { animate: false });
      first = false;
    };
    fit();
    const ro = new ResizeObserver(() => fit());
    ro.observe(map.getContainer());
    return () => ro.disconnect();
  }, [map, geo]);
  return null;
}

function WholeMapButton() {
  const map = useMap();
  const geo = useGeo();
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
          map.flyToBounds(geo.bounds, { duration: 0.5 });
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
  }, [map, geo]);
  return null;
}

function ClickToDrop({ enabled, onDrop }: { enabled: boolean; onDrop: (p: { x: number; y: number }) => void }) {
  const geo = useGeo();
  const map = useMapEvents({
    click(e) {
      if (!enabled) return;
      // Stored coordinates are always pin space, whichever base is showing.
      const p = geo.fromLatLng(e.latlng);
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
  const geo = useGeo();
  const [pos, setPos] = useState<{ x: number; y: number; sx: number; sy: number; z: number } | null>(null);
  const map = useMapEvents({
    mousemove(e) {
      const p = geo.fromLatLng(e.latlng);
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

function FlyTo({ target }: { target: { id?: string; x: number; y: number; key: number } | null }) {
  const map = useMap();
  const geo = useGeo();
  useEffect(() => {
    if (!target) return;
    // Aim at the middle of the part of the map the floating controls leave free, not at the map centre, so the pin is never
    // parked under the desktop filter card (or the phone's top and bottom bars).
    const zoom = Math.max(map.getZoom(), geo.tiles.maxNativeZoom - 0.5);
    const { top, bottom, left, right } = coveredEdges(map);
    const shift = L.point((left - right) / 2, (top - bottom) / 2);
    const centre = map.unproject(map.project(geo.toLatLng(target), zoom).subtract(shift), zoom);
    map.flyTo(centre, zoom, { duration: 0.6 });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [target, map]);
  return null;
}

/** Current zoom, rounded to the 0.25 snap, plus the "whole map" zoom. Also drives --lvg-s (see regionIcon). */
function useZoomState() {
  const map = useMap();
  const geo = useGeo();
  const read = () => ({ zoom: Math.round(map.getZoom() * 4) / 4, fit: map.getMinZoom() });
  const [state, setState] = useState(read);
  useMapEvents({
    zoom() {
      // 1 at native resolution (1 source px = 1 screen px), 2 when overzoomed once, and so on.
      map.getContainer().style.setProperty("--lvg-s", String(2 ** (map.getZoom() - geo.tiles.maxNativeZoom)));
    },
    zoomend() {
      setState(read());
    },
    resize() {
      setState(read());
    },
  });
  useEffect(() => {
    map.getContainer().style.setProperty("--lvg-s", String(2 ** (map.getZoom() - geo.tiles.maxNativeZoom)));
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
const placesFrom = (fit: number, maxZoom: number) => Math.min(0.75, 0.4 * (maxZoom - fit));
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
function clusterPins(map: L.Map, geo: Geo, pins: PublicPin[], zoom: number, keepSingle: Set<string>): Cluster[] {
  const out: Cluster[] = [];
  const cell = CLUSTER_PX;
  const grid = new Map<string, Cluster[]>();
  for (const p of pins) {
    const pt = map.project(geo.toLatLng(p), zoom);
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

/** Label zoom thresholds in labels.json are written for the art base (7200px wide, z6 native). Other bases scale to match. */
const LABEL_REF = { width: 7200, nativeZoom: 6 };
/** Pin names show at native resolution (z6 on the art base: one source pixel per screen pixel) and above. */
const PIN_NAME_MAX_CHARS = 28;

/** Label text metrics per kind (font px, letter spacing in em, box height px). Phones get the same sizes: 12px+ stays legible. */
const LABEL_FONT: Record<LabelKind, { px: number; narrowPx: number; spacing: number; h: number }> = {
  region: { px: 18, narrowPx: 15, spacing: 0.16, h: 26 },
  water: { px: 14, narrowPx: 13, spacing: 0.1, h: 20 },
  district: { px: 15, narrowPx: 13.5, spacing: 0.1, h: 20 },
  place: { px: 13.5, narrowPx: 13, spacing: 0.08, h: 18 },
};

interface PlacedLabel {
  label: MapLabel;
  ll: L.LatLngTuple;
  below: boolean;
}
interface PlacedName {
  pin: PublicPin;
  side: "r" | "l";
  text: string;
}

const clip = (t: string, n: number) => (t.length > n ? `${t.slice(0, n - 1).trimEnd()}…` : t);

/**
 * Decides which labels fit at this zoom. Everything is measured in projected screen pixels, so the result only changes
 * when the zoom does. Order of claims on screen space: pin markers and clusters, region chips, then labels by priority
 * (region > water > district > place), then pin names (selected first, then official ones). A label that would overlap
 * something already placed is dropped; zooming in spreads things out and brings it back.
 */
function layoutLabels(args: {
  map: L.Map;
  geo: Geo;
  zoom: number;
  narrow: boolean;
  regionsVisible: boolean;
  regions: PublicPin[];
  singles: PublicPin[];
  clusterPoints: { x: number; y: number }[];
  selectedId: string | null;
}): { labels: PlacedLabel[]; names: PlacedName[] } {
  const { map, geo, zoom, narrow, regionsVisible, regions, singles, clusterPoints, selectedId } = args;
  // Same on-screen size per pin-space unit as the art base would have at this "label zoom", whichever base is showing.
  const labelZoom = zoom - geo.tiles.maxNativeZoom + LABEL_REF.nativeZoom + Math.log2(geo.tiles.width / LABEL_REF.width);
  const occ = new Occupancy();
  const at = (p: { id?: string; x: number; y: number }) => {
    const ll = geo.toLatLng(p);
    return { ll, pt: map.project(ll, zoom) };
  };
  const labels: PlacedLabel[] = [];
  const anchored = new Set<string>();
  const place = (l: MapLabel) => {
    const f = LABEL_FONT[l.kind];
    const w = textWidth(l.name, narrow ? f.narrowPx : f.px, { spacingEm: f.spacing, display: true }) + 8;
    const { ll, pt } = at({ id: l.anchor, x: l.x, y: l.y });
    const below = !!l.anchor && l.kind !== "region";
    const r: Rect = below
      ? { x0: pt.x - w / 2, y0: pt.y + 3, x1: pt.x + w / 2, y1: pt.y + 3 + f.h }
      : { x0: pt.x - w / 2, y0: pt.y - f.h / 2, x1: pt.x + w / 2, y1: pt.y + f.h / 2 };
    if (!occ.tryPlace(r, 3)) return;
    labels.push({ label: l, ll, below });
    if (l.anchor) anchored.add(l.anchor);
  };
  const wanted = LABELS.filter((l) => (l.kind === "region" ? !regionsVisible : labelZoom >= l.minZoom)).sort(
    (a, b) => LABEL_PRIORITY[a.kind] - LABEL_PRIORITY[b.kind] || a.minZoom - b.minZoom,
  );
  // Region names are the map's headings: they claim their space before any pin does (a pin may sit over one; the text is big).
  for (const l of wanted.filter((l) => l.kind === "region")) place(l);
  for (const p of singles) {
    const { pt } = at(p);
    occ.reserve({ x0: pt.x - 14, y0: pt.y - 36, x1: pt.x + 14, y1: pt.y });
  }
  for (const c of clusterPoints) occ.reserve({ x0: c.x - 24, y0: c.y - 24, x1: c.x + 24, y1: c.y + 24 });
  if (regionsVisible) {
    for (const r of regions) {
      const { pt } = at(r);
      const w = textWidth(r.name, 15, { spacingEm: 0.1, display: true }) + 40;
      occ.reserve({ x0: pt.x - w / 2, y0: pt.y - 14, x1: pt.x + w / 2, y1: pt.y + 14 });
    }
  }
  for (const l of wanted.filter((l) => l.kind !== "region")) place(l);

  const names: PlacedName[] = [];
  if (zoom >= geo.tiles.maxNativeZoom - 0.01) {
    const shown = new Set(labels.map((l) => l.label.name.toLowerCase()));
    const order = [...singles].sort(
      (a, b) =>
        Number(b.id === selectedId) - Number(a.id === selectedId) ||
        Number(b.source === "official") - Number(a.source === "official") ||
        a.name.localeCompare(b.name),
    );
    for (const p of order) {
      // The pin and its own district label would say the same thing twice.
      if (anchored.has(p.id) || shown.has(p.name.toLowerCase())) continue;
      const text = clip(p.name, PIN_NAME_MAX_CHARS);
      const w = textWidth(text, 12, { display: false }) + 14;
      const { pt } = at(p);
      const right: Rect = { x0: pt.x + 16, y0: pt.y - 31, x1: pt.x + 16 + w, y1: pt.y - 13 };
      const left: Rect = { x0: pt.x - 16 - w, y0: pt.y - 31, x1: pt.x - 16, y1: pt.y - 13 };
      if (occ.tryPlace(right, 2)) names.push({ pin: p, side: "r", text });
      else if (occ.tryPlace(left, 2)) names.push({ pin: p, side: "l", text });
    }
  }
  return { labels, names };
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
  const geo = useGeo();
  const rel = zoom - fit;
  const placesVisible = showAllPlaces || rel >= placesFrom(fit, geo.tiles.maxZoom);
  const regionsVisible = rel <= REGIONS_UNTIL;

  const regions = useMemo(() => pins.filter((p) => p.type === "region"), [pins]);
  const places = useMemo(() => pins.filter((p) => p.type !== "region"), [pins]);

  const clusters = useMemo(() => {
    if (!placesVisible) return [];
    const keep = new Set<string>(selectedId ? [selectedId] : []);
    // At full zoom everything is spread out enough; never hide pins behind a cluster there.
    if (zoom >= geo.tiles.maxZoom - 0.01) return places.map((p) => ({ pins: [p], x: 0, y: 0 }));
    return clusterPins(map, geo, places, zoom, keep);
  }, [map, geo, places, zoom, placesVisible, selectedId]);

  const narrow = map.getSize().x < NARROW_PX;
  const layout = useMemo(() => {
    const singles = clusters.filter((c) => c.pins.length === 1).map((c) => c.pins[0]);
    const clusterPoints = clusters.filter((c) => c.pins.length > 1).map((c) => ({ x: c.x, y: c.y }));
    return layoutLabels({ map, geo, zoom, narrow, regionsVisible, regions, singles, clusterPoints, selectedId });
  }, [map, geo, zoom, narrow, regionsVisible, regions, clusters, selectedId]);

  return (
    <>
      {layout.labels.map((l) => (
        <Marker
          key={l.label.id}
          position={l.ll}
          icon={labelIcon(l.label.kind, l.label.name, l.below)}
          interactive={false}
          keyboard={false}
          zIndexOffset={-300}
        />
      ))}
      {layout.names.map((n) => (
        <Marker
          key={`name-${n.pin.id}`}
          position={geo.toLatLng(n.pin)}
          icon={pinNameIcon(n.text, n.side)}
          interactive={false}
          keyboard={false}
          zIndexOffset={-100}
        />
      ))}
      {regionsVisible
        ? regions.map((p) => (
            <Marker
              key={p.id}
              position={geo.toLatLng(p)}
              icon={regionIcon(p.name, p.id === selectedId, p.approximate, geo.base.bakedLabels && p.name === "Mount Kalaga", geo.base.bakedLabels)}
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
              position={geo.toLatLng(p)}
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
                const b = L.latLngBounds(c.pins.map((p) => geo.toLatLng(p)));
                const e = coveredEdges(map);
                map.flyToBounds(b, {
                  maxZoom: Math.min(geo.tiles.maxZoom, zoom + 1.5),
                  paddingTopLeft: [e.left + 70, e.top + 40],
                  paddingBottomRight: [e.right + 40, e.bottom + 40],
                  duration: 0.5,
                });
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
  const geo = useGeo();
  if (!show || hiddenCount === 0) return null;
  return (
    <div className="pointer-events-none absolute inset-x-0 bottom-[9.5rem] z-[900] flex justify-center sm:bottom-10x">
      <button
        type="button"
        onClick={() => map.setZoom(map.getMinZoom() + Math.min(1.25, (geo.tiles.maxZoom - map.getMinZoom()) * 0.6))}
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
  const geo = useGeo();
  const placeCount = props.pins.filter((p) => p.type !== "region").length;
  return (
    <>
      <PinLayer {...props} zoom={zoom} fit={fit} />
      <ZoomHint hiddenCount={placeCount} show={!props.showAllPlaces && zoom - fit < placesFrom(fit, geo.tiles.maxZoom)} />
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
  baseId = DEFAULT_BASE,
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
  /** Which base map to draw. Changing it remounts the map (tiles, bounds and pin projection all change). */
  baseId?: BaseId;
  pins: PublicPin[];
  selectedId: string | null;
  onSelect: (id: string) => void;
  dropMode: boolean;
  draft: { x: number; y: number } | null;
  onDraftChange: (p: { x: number; y: number }) => void;
  flyTarget: { id?: string; x: number; y: number; key: number } | null;
  showCoords: boolean;
  /** Skip the zoom-dependent hiding of place pins (an active search or filter, or a deep link). */
  showAllPlaces: boolean;
}) {
  const geo = geoFor(baseId);
  const draftHandlers = useMemo(
    () => ({
      dragend(e: L.LeafletEvent) {
        onDraftChange(geo.fromLatLng((e.target as L.Marker).getLatLng()));
      },
    }),
    [onDraftChange, geo],
  );

  const TILES = geo.tiles;
  return (
    <GeoContext.Provider value={geo}>
    <MapContainer
      key={baseId}
      crs={geo.crs}
      bounds={geo.bounds}
      maxBounds={geo.maxBounds}
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
        bounds={geo.bounds}
        noWrap
        keepBuffer={4}
        updateWhenZooming={false}
        attribution={geo.base.attribution}
        className="lvg-tiles"
      />
      <ZoomControlBottomRight />
      <FitToView />
      <WholeMapButton />
      <PinsAndHint pins={pins} selectedId={selectedId} onSelect={onSelect} showAllPlaces={showAllPlaces} />
      <AttributionPrefix />
      <BaseNote />
      {draft ? (
        <Marker position={geo.toLatLng(draft)} icon={draftIcon} draggable eventHandlers={draftHandlers} zIndexOffset={2000} />
      ) : null}
      <ClickToDrop enabled={dropMode} onDrop={onDraftChange} />
      <FlyTo target={flyTarget} />
      {showCoords ? <CoordsReadout /> : null}
    </MapContainer>
    </GeoContext.Provider>
  );
}

/**
 * "Illustrative base map" chip. The picture under the pins is a stand-in until Rockstar's official map is out; this says so
 * on the map itself and opens a short explanation. Lives inside the map container, so it must keep clicks away from the map.
 */
function BaseNote() {
  const geo = useGeo();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const panelId = useId();
  useEffect(() => {
    if (!ref.current) return;
    L.DomEvent.disableClickPropagation(ref.current);
    L.DomEvent.disableScrollPropagation(ref.current);
  }, []);
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);
  const { chip, title, body } = geo.base.note;
  return (
    <div
      ref={ref}
      data-testid="base-note"
      className="absolute right-2 top-[9.25rem] z-[900] flex max-w-[calc(100%-1rem)] flex-col items-end gap-1 sm:bottom-10 sm:left-3 sm:right-auto sm:top-auto sm:flex-col-reverse sm:items-start"
    >
      <button type="button" className="lvg-note" aria-expanded={open} aria-controls={panelId} onClick={() => setOpen((v) => !v)}>
        <span aria-hidden="true" className="lvg-note__i">
          i
        </span>
        {chip}
      </button>
      {open ? (
        <div id={panelId} role="note" className="lvg-note__panel">
          <strong>{title}</strong>
          <p>{body}</p>
          <button type="button" className="lvg-note__close" onClick={() => setOpen(false)}>
            Got it
          </button>
        </div>
      ) : null}
    </div>
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
