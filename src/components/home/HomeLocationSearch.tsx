"use client";

import { useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { MapSearch } from "@/components/map/MapSearch";
import { DEFAULT_BASE } from "@/lib/map/bases";
import { mapSearchHref, searchLocations, type SearchHit } from "@/lib/map/search";
import type { PublicPin } from "@/lib/map/types";

/** Location search for the home page. No Leaflet: picking a result goes to /map?pin= or /map?place=. */
export function HomeLocationSearch({ pins }: { pins: PublicPin[] }) {
  const router = useRouter();
  const inputRef = useRef<HTMLInputElement>(null);
  const [query, setQuery] = useState("");
  const { hits, total } = useMemo(() => searchLocations(query, pins, DEFAULT_BASE), [query, pins]);

  function onPick(hit: SearchHit) {
    router.push(mapSearchHref(hit));
  }

  return (
    <MapSearch
      query={query}
      onQueryChange={setQuery}
      hits={hits}
      total={total}
      onPick={onPick}
      inputRef={inputRef}
      pinsHint={false}
    />
  );
}
