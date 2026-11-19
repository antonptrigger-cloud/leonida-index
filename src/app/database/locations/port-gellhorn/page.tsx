import { metaFor } from "@/lib/seo/site";
import { ReferencePage } from "@/components/database/ReferencePage";
import { PORT_GELLHORN_PATH } from "@/lib/database/places";

export const metadata = metaFor(PORT_GELLHORN_PATH);

export default function PortGellhornPage() {
  return <ReferencePage path={PORT_GELLHORN_PATH} />;
}
