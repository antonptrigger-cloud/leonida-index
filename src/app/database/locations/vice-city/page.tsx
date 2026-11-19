import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { VICE_CITY_PATH } from "@/lib/database/places";

export const metadata = metaFor(VICE_CITY_PATH);

export default function ViceCityPage() {
  return <ReferencePage path={VICE_CITY_PATH} />;
}
