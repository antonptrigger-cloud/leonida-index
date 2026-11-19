import "./hub.css";

/**
 * Responsive grid for <TapeCard> items: 1 column on phones, 2 on tablets, then one column per card up to 4
 * (3 columns for 5+ cards) so a row never ends with a lone card. `stagger` drops every second card for rhythm.
 * Children must be <li> elements.
 */
export function HubGrid({ count, stagger = false, children }: { count: number; stagger?: boolean; children: React.ReactNode }) {
  const cols = count <= 4 ? Math.max(count, 1) : 3;
  return (
    <ul className="gh-grid" data-stagger={stagger || undefined} style={{ ["--cols" as string]: cols }}>
      {children}
    </ul>
  );
}
