import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { GANGS_PATH } from "@/lib/database/places";

export const metadata = metaFor(GANGS_PATH);

export default function GangsPage() {
  return <ReferencePage path={GANGS_PATH} />;
}
