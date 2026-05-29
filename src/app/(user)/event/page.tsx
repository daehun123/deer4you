import EventListView from "./_components/EventListView";
import { fetchEvents } from "./_data/eventData";

export default async function EventPage() {
  const items = await fetchEvents();
  return <EventListView items={items} />;
}
