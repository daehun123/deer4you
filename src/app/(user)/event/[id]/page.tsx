import { notFound } from "next/navigation";
import { fetchEventById } from "../_data/eventData";
import EventDetailView from "../_components/EventDetailView";

export default async function EventDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const item = await fetchEventById(resolvedParams.id);
  if (!item) return notFound();

  return <EventDetailView item={item} />;
}

