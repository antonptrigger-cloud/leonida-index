import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { KEY_LENTO_PATH } from "@/lib/database/places";

export const metadata = metaFor(KEY_LENTO_PATH);

export default function KeyLentoPage() {
  return <ReferencePage path={KEY_LENTO_PATH} />;
}
