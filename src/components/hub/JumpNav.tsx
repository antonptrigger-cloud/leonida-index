import "./hub.css";
import type { HubAccent } from "./TapeCard";

/** Sticky quick-jump chip bar that anchors to section ids. Place it as a direct child of the page wrapper so it can stick. */
export function JumpNav({ items }: { items: { id: string; num: string; label: string; accent: HubAccent }[] }) {
  return (
    <nav className="gh-jump" aria-label="Jump to a section">
      <ul>
        {items.map((n) => (
          <li key={n.id}>
            <a href={`#${n.id}`} className="gh-jump__chip" data-accent={n.accent}>
              <span aria-hidden>{n.num}</span> {n.label}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
