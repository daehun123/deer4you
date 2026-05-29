import LostAndFoundListView from "./_components/list/LostAndFoundListView";
import { fetchLostItems } from "./_data/lostAndFoundData";

export default async function LostAndFoundPage() {
  const items = await fetchLostItems();
  return <LostAndFoundListView items={items} />;
}
