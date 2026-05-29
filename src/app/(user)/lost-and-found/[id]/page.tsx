import { notFound } from "next/navigation";
import { fetchLostItemById } from "../_data/lostAndFoundData";
import LostAndFoundDetailView from "../_components/detail/LostAndFoundDetailView";

export default async function LostAndFoundDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const item = await fetchLostItemById(resolvedParams.id);
  if (!item) return notFound();

  return <LostAndFoundDetailView item={item} />;
}

