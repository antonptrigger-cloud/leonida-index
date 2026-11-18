import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { VEHICLES_PATH } from "@/lib/database/reference";

export const metadata = metaFor(VEHICLES_PATH);

export default function VehiclesPage() {
  return <ReferencePage path={VEHICLES_PATH} />;
}
