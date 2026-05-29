import {
  getEvent,
  getEvents,
  type EventApiDetailItem,
  type EventApiItem,
} from "@/api/events";

export type EventItem = {
  id: string;
  title: string;
  timeRange: string; // "10:00 - 22:00"
  location: string; // "학생회관 앞 A 1-5"
  imageUrl?: string;
  content?: string;
  descriptionLines?: string[];
  howToSteps?: string[];
  benefitTitle?: string;
  benefitDescription?: string;
  benefitPlaceholder?: boolean;
  notes?: string[];
};

function formatHHmm(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function toDescriptionLines(description: string | null) {
  if (!description) return undefined;
  const lines = description
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : undefined;
}

function mapEventApiItemToEventItem(api: EventApiItem): EventItem {
  const start = formatHHmm(api.startTime);
  const end = formatHHmm(api.endTime);
  const timeRange = start && end ? `${start} - ${end}` : start || end || "-";
  return {
    id: String(api.id),
    title: api.title,
    timeRange,
    location: api.location,
    imageUrl: api.imageUrls?.[0],
    descriptionLines: toDescriptionLines(api.description),
  };
}

function mapEventApiDetailToEventItem(api: EventApiDetailItem): EventItem {
  return {
    ...mapEventApiItemToEventItem(api),
    content: api.content ?? undefined,
  };
}

export async function fetchEvents(): Promise<EventItem[]> {
  const data = await getEvents();
  return data.map(mapEventApiItemToEventItem);
}

export async function fetchEventById(id: string): Promise<EventItem | null> {
  const data = await getEvent(id);
  if (!data) return null;
  return mapEventApiDetailToEventItem(data);
}
