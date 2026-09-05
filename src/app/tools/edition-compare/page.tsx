import { PageHeader } from "@/components/PageHeader";
export const metadata = { title: "Edition compare" };
export default function Page() {
  return (
    <div>
      <PageHeader kicker="Tool" title="Standard vs Ultimate" source="Official" />
      <div className="overflow-x-auto">
        <table className="w-full min-w-[32rem] border-collapse text-left text-sm">
          <thead>
            <tr className="border-b border-[#2a2a2e] text-[#9a958c]">
              <th className="py-2 pr-4"> </th>
              <th className="py-2 pr-4">Standard ~$80</th>
              <th className="py-2">Ultimate ~$100</th>
            </tr>
          </thead>
          <tbody className="text-[#cfc9be]">
            <tr className="border-b border-[#2a2a2e]"><td className="py-3 pr-4">Game</td><td className="pr-4">Full campaign + map</td><td>Same + extras threaded through chapters</td></tr>
            <tr className="border-b border-[#2a2a2e]"><td className="py-3 pr-4">Pre-order</td><td className="pr-4">Vintage Vice City Pack</td><td>Same pack if pre-ordered</td></tr>
            <tr className="border-b border-[#2a2a2e]"><td className="py-3 pr-4">Vehicles</td><td className="pr-4">Base</td><td>’95 Grotti Cheetah, Dominator Buggy, more</td></tr>
            <tr className="border-b border-[#2a2a2e]"><td className="py-3 pr-4">Venues</td><td className="pr-4">Base shops</td><td>Rideout Customs, Sara’s Salon, others</td></tr>
            <tr><td className="py-3 pr-4">Upgrade</td><td className="pr-4">Can buy Ultimate later</td><td>Included</td></tr>
          </tbody>
        </table>
      </div>
      <p className="mt-4 text-xs text-[#9a958c]">Confirm against Rockstar’s official editions page before you treat a row as final.</p>
    </div>
  );
}
