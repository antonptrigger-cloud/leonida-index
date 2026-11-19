/**
 * Chapter 2+ story mission names and story places that must not show as plain text on database and character pages.
 * A source whose label, note or web address matches is listed inside a spoiler blur instead of in the open list.
 * Must not import from src/lib/seo.
 */
const NAMES = [
  "what's in the bag", "ambulance chaser", "just moved in", "girls?'? trip", "girls' trap", "take a vehicle to moses", "crawler for moses",
  "daily driver", "slam dunk", "breakfast run", "coffee break", "afternoon delight", "thrillbillies", "twist,? wrist", "check out the mud club",
  "checking out", "check on jason", "rob vicki", "find painkillers", "steal vehicles for moses", "collect moses",
  "welcome to vice city", "dealer's choice", "meet the heders", "dubious provenance", "mami knows best", "south leonida real estate",
  "here, kitty kitty", "car services", "top billing", "boobie time", "first impressions", "caught slipping", "crosstown traffic", "credit check",
  "zorru?sso", "sinfrontera national bank", "security expert", "ride or die", "company property", "the missing link", "safe word", "cooties",
  "bricked up", "hidden charges", "the cartel heist", "another life", "company cars", "lawyer up", "party hard", "heavy lifting", "photo/shoot",
  "making gainz", "cash injections", "amateur hour", "dirty work", "too much baggage", "adventures in babysitting", "fresh evidence",
  "power play", "child's play", "headliners", "close surveillance", "delivery method", "team building", "fully catered", "vcia takedown",
  "bird in the hand", "taking liberties", "vc baby", "doggie bag", "savage glory", "protective custody",
  "moses \\(take", "starlet motel", "scarlet motel", "mud club",
];
const RE = new RegExp(NAMES.join("|"), "i");

/** Text or web addresses (hyphens count as spaces) that name a Chapter 2+ story mission or story place. */
export function namesStory(...parts: (string | undefined)[]): boolean {
  return RE.test(parts.filter(Boolean).join(" | ").replace(/[-_]+/g, " "));
}

/** Split a source list into the ones that are safe to show and the ones that belong in a blur. */
export function splitSources<T extends { label: string; url: string; used?: string }>(sources: T[]): { open: T[]; hidden: T[] } {
  const open: T[] = [];
  const hidden: T[] = [];
  for (const s of sources) (namesStory(s.label, s.url, s.used) ? hidden : open).push(s);
  return { open, hidden };
}
