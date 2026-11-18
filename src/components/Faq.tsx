import { JsonLd, faqSchema, type FaqItem } from "@/lib/seo/jsonld";

/**
 * Visible FAQ + FAQPage JSON-LD from one list, so the markup can never describe content
 * that is not on the page. Renders nothing when `items` is empty or missing.
 * Only pass real questions that the page's own copy answers; never invent them.
 */
export function Faq({ items, title = "Frequently asked questions" }: { items?: FaqItem[]; title?: string }) {
  const schema = items?.length ? faqSchema(items) : null;
  if (!items?.length || !schema) return null;
  return (
    <section aria-labelledby="faq" className="mt-16x">
      <JsonLd data={schema} />
      <h2 id="faq" className="vc-display text-3xl text-ink">{title}</h2>
      <dl className="mt-4x flex flex-col gap-4x">
        {items.map((f) => (
          <div key={f.question} className="vc-bar">
            <dt className="font-semibold text-ink">{f.question}</dt>
            <dd className="mt-1x text-ink-2">{f.answer}</dd>
          </div>
        ))}
      </dl>
    </section>
  );
}
