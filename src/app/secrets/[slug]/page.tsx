import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
import { SecretArticle } from "@/components/secrets/SecretBits";
import { SECRET_ENTRIES, SECRETS_VERIFIED_LABEL, isSecretSlug, SECRET_BY_SLUG } from "@/lib/secrets/entries";

export const dynamicParams = false;

export function generateStaticParams() {
  return SECRET_ENTRIES.map((e) => ({ slug: e.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  if (!isSecretSlug(slug)) return {};
  return metaFor(SECRET_BY_SLUG[slug].path);
}

export default async function SecretPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  if (!isSecretSlug(slug)) notFound();
  const entry = SECRET_BY_SLUG[slug];
  return (
    <div>
      <PageSchema path={entry.path} breadcrumbs={false} />
      <Breadcrumbs path={entry.path} />
      <PageHeader
        backdrop={entry.backdrop}
        kicker={entry.kicker}
        title={entry.title}
        verified={SECRETS_VERIFIED_LABEL}
        source={entry.source}
      />
      <div className="grid gap-10x lg:grid-cols-12">
        <div className="min-w-0 lg:col-span-8">
          <SecretArticle entry={entry} />
          <Related path={entry.path} />
        </div>
      </div>
    </div>
  );
}
