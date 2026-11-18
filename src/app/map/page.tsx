import { CommunityMap } from "@/components/map/CommunityMap";
import { getLivePins } from "@/lib/map/service";

export const metadata = {
  title: "Map",
  description: "Community interactive map of Leonida: landmarks, secrets, collectibles and quests marked by players.",
};

export const dynamic = "force-dynamic";

export default async function MapIndex() {
  const { pins, online } = await getLivePins();
  return <CommunityMap initialPins={pins} online={online} />;
}
