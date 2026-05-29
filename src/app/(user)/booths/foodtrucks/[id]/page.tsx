import { foodTruckList } from "@/data/festival";
import { notFound } from "next/navigation";
import FestivalBoothDetailView from "../../_components/FestivalBoothDetailView";

export default async function FoodTruckDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n) || !Number.isInteger(n)) notFound();
  const item = foodTruckList.find((b) => b.id === n);
  if (!item) notFound();
  return <FestivalBoothDetailView item={item} categoryLabel="푸드트럭" />;
}
