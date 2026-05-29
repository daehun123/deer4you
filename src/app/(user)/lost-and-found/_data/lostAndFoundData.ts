import {
  getLostItem,
  getLostItems,
  type LostItemApi,
  type LostItemCategoryApi,
  type LostItemDetailApi,
  type LostItemStatusApi,
} from "@/api/lost-items";

export type LostItemCategory =
  | "전체"
  | "의류"
  | "액세서리"
  | "전자기기"
  | "가방"
  | "지갑"
  | "서류"
  | "우산"
  | "텀블러"
  | "문구"
  | "열쇠"
  | "기타";

export type LostItemStatus = "보관중" | "인계완료";

export type LostItem = {
  id: string;
  title: string;
  foundAt: string; // "2026.05.28 19:40"
  foundLocation: string;
  category: Exclude<LostItemCategory, "전체">;
  status: LostItemStatus;
  imageUrl?: string;
  storageLocation?: string;
  descriptionLines?: string[];
};

export const lostItemCategories: LostItemCategory[] = [
  "전체",
  "지갑",
  "전자기기",
  "액세서리",
  "가방",
  "의류",
  "서류",
  "우산",
  "텀블러",
  "문구",
  "열쇠",
  "기타",
];

const CATEGORY_API_TO_UI: Record<LostItemCategoryApi, Exclude<LostItemCategory, "전체">> =
  {
    CLOTHING: "의류",
    ACCESSORY: "액세서리",
    ELECTRONICS: "전자기기",
    BAG: "가방",
    WALLET: "지갑",
    DOCUMENT: "서류",
    UMBRELLA: "우산",
    BOTTLE: "텀블러",
    STATIONERY: "문구",
    KEY: "열쇠",
    OTHER: "기타",
  };

const CATEGORY_UI_TO_API: Partial<
  Record<LostItemCategory, LostItemCategoryApi>
> = {
  의류: "CLOTHING",
  액세서리: "ACCESSORY",
  전자기기: "ELECTRONICS",
  가방: "BAG",
  지갑: "WALLET",
  서류: "DOCUMENT",
  우산: "UMBRELLA",
  텀블러: "BOTTLE",
  문구: "STATIONERY",
  열쇠: "KEY",
  기타: "OTHER",
};

export function toLostItemCategoryApi(
  category: LostItemCategory,
): LostItemCategoryApi | undefined {
  if (category === "전체") return undefined;
  return CATEGORY_UI_TO_API[category];
}

function mapStatus(status: LostItemStatusApi): LostItemStatus {
  return status === "STORED" ? "보관중" : "인계완료";
}

function formatKoreanDateTime(iso: string | null | undefined) {
  if (!iso) return "-";
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "-";
  const yyyy = d.getFullYear();
  const mm = String(d.getMonth() + 1).padStart(2, "0");
  const dd = String(d.getDate()).padStart(2, "0");
  const hh = String(d.getHours()).padStart(2, "0");
  const mi = String(d.getMinutes()).padStart(2, "0");
  return `${yyyy}.${mm}.${dd} ${hh}:${mi}`;
}

function toDescriptionLines(description: string | null | undefined) {
  if (!description) return undefined;
  const lines = description
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : undefined;
}

function mapLostItemApiToLostItem(api: LostItemApi): LostItem {
  return {
    id: String(api.id),
    title: api.itemName,
    foundAt: formatKoreanDateTime(api.createdAt),
    foundLocation: api.foundLocation,
    category: CATEGORY_API_TO_UI[api.category],
    status: mapStatus(api.status),
    imageUrl: api.imageUrls?.[0],
  };
}

function mapLostItemDetailApiToLostItem(api: LostItemDetailApi): LostItem {
  const base = mapLostItemApiToLostItem(api);
  return {
    ...base,
    foundAt: api.foundTime ?? api.createdAt ?? "-",
    storageLocation: api.storageLocation ?? undefined,
    descriptionLines: toDescriptionLines(api.description),
  };
}

export async function fetchLostItems(): Promise<LostItem[]> {
  const data = await getLostItems();
  return data.map(mapLostItemApiToLostItem);
}

export async function fetchLostItemsByQuery(params: {
  search?: string;
  category?: LostItemCategory;
}): Promise<LostItem[]> {
  const data = await getLostItems({
    search: params.search,
    category: params.category ? toLostItemCategoryApi(params.category) : undefined,
  });
  return data.map(mapLostItemApiToLostItem);
}

export async function fetchLostItemById(id: string): Promise<LostItem | null> {
  const data = await getLostItem(id);
  if (!data) return null;
  return mapLostItemDetailApiToLostItem(data);
}
