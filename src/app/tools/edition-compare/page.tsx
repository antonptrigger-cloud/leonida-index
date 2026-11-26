import { metaFor } from "@/lib/seo/site";
import { PageSchema } from "@/lib/seo/jsonld";
import { PageHeader } from "@/components/PageHeader";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import { Related } from "@/components/Related";
export const metadata = metaFor("/tools/edition-compare");
export default function Page() {
  return (
    <div>
      <PageSchema path="/tools/edition-compare" breadcrumbs={false} />
      <Breadcrumbs path="/tools/edition-compare" />
      <PageHeader kicker="Tool" title="Standard vs Ultimate" source="Official" verified="after launch" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-line text-muted">
              <th className="py-2 pr-4"> </th>
              <th className="py-2 pr-4">Standard ~$80</th>
              <th className="py-2">Ultimate ~$100</th>
            </tr>
          </thead>
          <tbody className="text-ink-2">
            <tr className="border-b border-line"><td className="py-3 pr-4">Game</td><td className="pr-4">Full campaign + map</td><td>Same + extras threaded through chapters</td></tr>
            <tr className="border-b border-line"><td className="py-3 pr-4">Pre-order</td><td className="pr-4">Vintage Vice City Pack</td><td>Same pack if pre-ordered</td></tr>
            <tr className="border-b border-line"><td className="py-3 pr-4">Vehicles</td><td className="pr-4">Base</td><td>’95 Grotti Cheetah, Dominator Buggy, more</td></tr>
            <tr className="border-b border-line"><td className="py-3 pr-4">Venues</td><td className="pr-4">Base shops</td><td>Rideout Customs, Sara’s Salon, others</td></tr>
            <tr><td className="py-3 pr-4">Upgrade</td><td className="pr-4">Can buy Ultimate later</td><td>Included</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-muted">Confirm against Rockstar’s official editions page before you treat a row as final.</p>
      <Related path="/tools/edition-compare" />
    </div>
  );
}
