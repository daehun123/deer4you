import type { BoothPlace, FestivalListItem } from "@/data/festival/types";

export function parseLocationKey(location?: string | null): string | null {
  if (!location) return null;
  const match = location.match(/A-\d+-\d+/);
  return match ? match[0] : null;
}

export function matchesZoneBoothNo(
  item: FestivalListItem,
  zone: FestivalListItem["zone"],
  boothNo: string,
): boolean {
  if (
    item.zone === zone &&
    item.boothNo != null &&
    String(item.boothNo) === boothNo
  ) {
    return true;
  }

  return (
    item.boothPlaces?.some(
      (place) =>
        place.zone === zone &&
        place.boothNo != null &&
        String(place.boothNo) === boothNo,
    ) ?? false
  );
}

export function getBoothPlaces(item: FestivalListItem): BoothPlace[] {
  if (item.boothPlaces?.length) return item.boothPlaces;

  if (item.location) {
    return [
      {
        label: "시설 정보",
        boothNo: item.boothNo,
        zone: item.zone,
        location: item.location,
      },
    ];
  }

  return [];
}
