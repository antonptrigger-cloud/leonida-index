import Link from "next/link";
import { JsonLd, breadcrumbSchema } from "@/lib/seo/jsonld";
import { crumbsFor } from "@/lib/seo/site";

/**
 * Visible breadcrumb trail plus its BreadcrumbList JSON-LD, both built from the same
 * `crumbsFor(path)` so the markup always matches what readers see. Pages that render this
 * should pass `breadcrumbs={false}` to `<PageSchema>` to avoid a duplicate list.
 */
export function Breadcrumbs({ path, className = "mb-6x text-xs text-muted" }: { path: string; className?: string }) {
  const crumbs = crumbsFor(path);
  if (crumbs.length < 2) return null;
  const schema = breadcrumbSchema(path);
  return (
    <>
      {schema ? <JsonLd data={schema} /> : null}
      <nav aria-label="Breadcrumb" className={className}>
        <ol className="flex flex-wrap items-center gap-x-2x gap-y-1x">
          {crumbs.map((c, i) => {
            const last = i === crumbs.length - 1;
            return (
              <li key={c.path} className="flex items-center gap-x-2x">
                {last ? (
                  <span aria-current="page" className="text-ink-2">{c.name}</span>
                ) : (
                  <Link href={c.path} className="hover:text-pink">{c.name}</Link>
                )}
                {last ? null : <span aria-hidden>/</span>}
              </li>
            );
          })}
        </ol>
      </nav>
    </>
  );
}
