import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { WEAPONS_PATH } from "@/lib/database/reference";

export const metadata = metaFor(WEAPONS_PATH);

export default function WeaponsPage() {
  return <ReferencePage path={WEAPONS_PATH} />;
}
