import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { LOCATIONS_PATH } from "@/lib/database/places";

export const metadata = metaFor(LOCATIONS_PATH);

export default function LocationsPage() {
  return <ReferencePage path={LOCATIONS_PATH} />;
}
