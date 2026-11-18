import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { RADIO_PATH } from "@/lib/database/reference";

export const metadata = metaFor(RADIO_PATH);

export default function RadioPage() {
  return <ReferencePage path={RADIO_PATH} />;
}
