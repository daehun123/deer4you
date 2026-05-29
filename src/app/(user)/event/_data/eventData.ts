import {
  getEvent,
  getEvents,
  type EventApiDetailItem,
  type EventApiItem,
} from "@/api/events";

export type BenefitDisplayItem =
  | { kind: "line"; text: string }
  | { kind: "section"; title: string };

const EVENT_CAUTION_OVERRIDES: Record<string, BenefitDisplayItem[]> = {
  "7": [
    { kind: "line", text: "참여 비용은 종목별 1회 기준입니다." },
    { kind: "line", text: "기록은 현장 운영진 확인 기준으로 인정됩니다." },
    { kind: "line", text: "대리 참여 및 대리 수령은 제한될 수 있습니다." },
    {
      kind: "line",
      text: "게임 참여 시 안전사고 예방을 위해 무리한 동작은 삼가 주시기 바랍니다.",
    },
    {
      kind: "line",
      text: "운영진의 안내를 따르지 않거나 개인 부주의로 인해 발생한 부상에 대해서는 주최 측에서 책임지지 않습니다.",
    },
    {
      kind: "line",
      text: "기계가 파손될 경우 책임은 참가자 본인에게 있습니다.",
    },
    {
      kind: "line",
      text: "동점자 발생 시, 개별 연락으로 게임을 한 번 더 진행합니다.",
    },
  ],
};

/**
 * 이벤트 id → 유의사항 위 이미지 (public 경로).
 * 예: "7": ["/events/caution-7.webp"]
 */
export const EVENT_CAUTION_IMAGE_OVERRIDES: Record<string, string[]> = {};

/** 이벤트 id → 혜택 줄별 이미지 (public 경로, benefit line 순서와 1:1) */
const EVENT_BENEFIT_IMAGE_OVERRIDES: Record<string, string[]> = {
  "7": [
    "/product/nike.webp",
    "/product/baemin_5.webp",
    "/product/baemin_3.webp",
    "/product/v.webp",
    "/product/olive_5.webp",
    "/product/olive_3.webp",
  ],
  "8": ["/product/baemin_5.webp"],
  "10": ["/product/light.webp"],
  "11": [
    "/product/max.webp",
    "/product/moms.webp",
    "/product/5000.webp",
    "/product/coupon.webp",
  ],
  "13": [
    "/product/ipad.webp",
    "/product/standbyme.webp",
    "/product/newworld.webp",
  ],
};

/** 이벤트 id → 대상 (상세 일시 위 표시) */
const EVENT_TARGET_OVERRIDES: Record<string, string> = {
  "9": "상명대학교 재학생",
  "10": "학생회비 납부자",
  "11": "학생회비 납부자",
  "12": "상명대학교 재(휴)학생",
  "13": "상명대학교 학생회비 납부자 재학생",
  "14": "상명대학교 재(휴)학생 및 외부인",
};

/** 이벤트 id → 운영 시간 미표시 (상세·목록) */
const EVENT_HIDE_TIME_RANGE_IDS = new Set(["14"]);

/** 이벤트 목록 썸네일 (목록 표시 순서와 동일) */
const EVENT_LIST_THUMBNAIL_BY_ID: Record<string, string> = {
  "7": "/Events/thumb_punch.webp",
  "8": "/Events/thumb_timer.webp",
  "9": "/Events/thumb_letter.webp",
  "10": "/Events/thumb_dress.webp",
  "11": "/Events/thumb_stamp.webp",
  "12": "/Events/thumb_polaroid.webp",
  "13": "/Events/thumb_lucky.webp",
  "14": "/Events/thumb_visitor.webp",
};

/** 이벤트 id → 상세 상단 배너 (public 경로, API 이미지보다 우선) */
const EVENT_DETAIL_BANNER_BY_ID: Record<string, string> = {
  "10": "/Events/banner_dress.webp",
  "11": "/Events/banner_stamp.webp",
  "12": "/Events/banner_polaroid.webp",
  "13": "/Events/banner_lucky.webp",
};

export type EventItem = {
  id: string;
  title: string;
  timeRange: string; // "10:00 - 22:00"
  hideTimeRange?: boolean;
  targetAudience?: string;
  location: string; // "학생회관 앞 A 1-5"
  imageUrl?: string;
  listThumbnailUrl?: string;
  homeThumbnailUrl?: string;
  homeLabel?: string;
  content?: string;
  descriptionLines?: string[];
  howToSteps?: string[];
  benefitItems?: BenefitDisplayItem[];
  benefitImageUrls?: string[];
  cautionItems?: BenefitDisplayItem[];
  showCautionImageSlot?: boolean;
  cautionImageUrls?: string[];
};

function formatHHmm(iso: string) {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  const hh = String(d.getHours()).padStart(2, "0");
  const mm = String(d.getMinutes()).padStart(2, "0");
  return `${hh}:${mm}`;
}

function toTextLines(text: string | null | undefined) {
  if (!text) return undefined;
  const lines = text
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
  return lines.length > 0 ? lines : undefined;
}

/** 드레스코드 등: 한 줄에 27일·28일이 붙어 있으면 28일 앞에서 분리 */
function normalizeHowToSteps(id: string, content: string | null | undefined) {
  const lines = toTextLines(content);
  if (!lines) return undefined;
  if (id !== "10") return lines;

  return lines.flatMap((line) => {
    const parts = line
      .split(/(?=28일:)/)
      .map((part) => part.trim())
      .filter(Boolean);
    return parts.length > 1 ? parts : [line];
  });
}

function normalizeImageUrls(urls: unknown): string[] | undefined {
  if (!Array.isArray(urls)) return undefined;
  const normalized = urls
    .filter((url): url is string => typeof url === "string")
    .map((url) => url.trim())
    .filter(
      (url) =>
        url.length > 0 &&
        (url.startsWith("http://") || url.startsWith("https://")),
    );
  return normalized.length > 0 ? normalized : undefined;
}

function hasRankPattern(text: string) {
  return /\d+등/.test(text);
}

function splitBenefitSection(section: string) {
  const trimmed = section.trim();
  if (!trimmed) return [];

  if (hasRankPattern(trimmed)) {
    return trimmed
      .split(/\s*\/\s*/)
      .map((part) => part.trim())
      .filter(Boolean);
  }

  return [trimmed];
}

function formatBenefitRankLine(text: string) {
  const trimmed = text.trim();
  const rankMatch = trimmed.match(/^(\d+등)\s*[:：]\s*(.+)$/);
  if (rankMatch) return `[${rankMatch[1]}] ${rankMatch[2]}`;
  return trimmed;
}

function parseBenefitSection(section: string) {
  const trimmed = section.trim();
  const genderMatch = trimmed.match(/^(남학우|여학우)\s*/);

  if (genderMatch) {
    const title = genderMatch[1];
    const body = trimmed.slice(genderMatch[0].length);
    const lines = splitBenefitSection(body).map(formatBenefitRankLine);
    return { title, lines };
  }

  return {
    lines: splitBenefitSection(trimmed).map(formatBenefitRankLine),
  };
}

function toBenefitItems(
  text: string | null | undefined,
): BenefitDisplayItem[] | undefined {
  if (!text?.trim()) return undefined;

  if (text.includes("\n")) {
    const lines = toTextLines(text);
    return lines?.map((line) => ({ kind: "line", text: line }));
  }

  if (text.includes("|")) {
    const sections = text.split(/\s*\|\s*/).filter((s) => s.trim());
    const items: BenefitDisplayItem[] = [];

    sections.forEach((section) => {
      const { title, lines } = parseBenefitSection(section);
      if (title) items.push({ kind: "section", title });
      for (const line of lines) {
        items.push({ kind: "line", text: line });
      }
    });

    return items.length > 0 ? items : undefined;
  }

  if (hasRankPattern(text) && text.includes("/")) {
    const { title, lines } = parseBenefitSection(text);
    const items: BenefitDisplayItem[] = [];
    if (title) items.push({ kind: "section", title });
    for (const line of lines) {
      items.push({ kind: "line", text: line });
    }
    return items.length > 0 ? items : undefined;
  }

  return [{ kind: "line", text: text.trim() }];
}

function pickCaution(api: EventApiDetailItem): string | undefined {
  const raw = api as EventApiDetailItem & Record<string, unknown>;
  const value = api.caution ?? raw.caution;
  if (typeof value !== "string") return undefined;
  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toCautionItems(
  caution: string | undefined,
): BenefitDisplayItem[] | undefined {
  if (!caution) return undefined;
  const lines = toTextLines(caution) ?? [caution];
  return lines.map((text) => ({ kind: "line", text }));
}

function resolveCautionImageSlot(api: EventApiDetailItem) {
  const urls = EVENT_CAUTION_IMAGE_OVERRIDES[String(api.id)]
    ?.map((url) => url.trim())
    .filter(Boolean);
  if (!urls?.length) {
    return {
      showCautionImageSlot: false as const,
      cautionImageUrls: [] as string[],
    };
  }
  return {
    showCautionImageSlot: true as const,
    cautionImageUrls: urls,
  };
}

function resolveCautionItems(
  api: EventApiDetailItem,
): BenefitDisplayItem[] | undefined {
  const fromApi = toCautionItems(pickCaution(api));
  if (fromApi) return fromApi;

  const override = EVENT_CAUTION_OVERRIDES[String(api.id)];
  return override;
}

/** 관리자 폼: API caution 우선, 없으면 프론트 fallback 문구(줄바꿈) */
export function getCautionTextForForm(api: EventApiDetailItem): string {
  const fromApi = pickCaution(api);
  if (fromApi) return fromApi;

  const override = EVENT_CAUTION_OVERRIDES[String(api.id)];
  if (!override) return "";

  return override
    .filter((entry) => entry.kind === "line")
    .map((entry) => entry.text)
    .join("\n");
}

function pickContentImageUrls(api: EventApiDetailItem): string[] | undefined {
  const raw = api as EventApiDetailItem & Record<string, unknown>;
  return (
    normalizeImageUrls(api.contentImageUrls) ??
    normalizeImageUrls(raw.content_image_urls)
  );
}

function countBenefitLines(items: BenefitDisplayItem[] | undefined) {
  return items?.filter((entry) => entry.kind === "line").length ?? 0;
}

function resolveBenefitImageUrls(
  api: EventApiDetailItem,
  benefitItems: BenefitDisplayItem[] | undefined,
): string[] | undefined {
  const fromApi = pickContentImageUrls(api);
  if (fromApi?.length) return fromApi;

  const override = EVENT_BENEFIT_IMAGE_OVERRIDES[String(api.id)];
  if (!override?.length) return undefined;

  const lineCount = countBenefitLines(benefitItems);
  if (lineCount === 0) return undefined;

  return override.slice(0, lineCount);
}

function mapEventApiItemToEventItem(api: EventApiItem): EventItem {
  const start = formatHHmm(api.startTime);
  const end = formatHHmm(api.endTime);
  const timeRange = start && end ? `${start} - ${end}` : start || end || "-";
  const id = String(api.id);
  return {
    id,
    title: api.title,
    timeRange,
    hideTimeRange: EVENT_HIDE_TIME_RANGE_IDS.has(id),
    location: api.location,
    imageUrl: EVENT_DETAIL_BANNER_BY_ID[id] ?? api.imageUrls?.[0],
    listThumbnailUrl: EVENT_LIST_THUMBNAIL_BY_ID[id],
    descriptionLines: toTextLines(api.description),
  };
}

function mapEventApiDetailToEventItem(api: EventApiDetailItem): EventItem {
  const benefitItems = toBenefitItems(api.productDescription);
  const id = String(api.id);
  return {
    ...mapEventApiItemToEventItem(api),
    targetAudience: EVENT_TARGET_OVERRIDES[id],
    content: api.content ?? undefined,
    howToSteps: normalizeHowToSteps(id, api.content),
    benefitItems,
    benefitImageUrls: resolveBenefitImageUrls(api, benefitItems),
    cautionItems: resolveCautionItems(api),
    ...resolveCautionImageSlot(api),
  };
}

/** 메인 홈에 노출할 이벤트 id (표시 순서) */
const HOME_FEATURED_EVENT_IDS = ["7", "9", "13"] as const;

/** 메인 홈 썸네일 (펀치 → 편지 → 럭키드로우) */
const HOME_EVENT_THUMBNAIL_BY_ID: Record<string, string> = {
  "7": "/Events/main_punch.svg",
  "9": "/Events/main_letter.svg",
  "13": "/Events/main_lucky.svg",
};

/** 메인 홈 썸네일 하단 라벨 */
const HOME_EVENT_LABEL_BY_ID: Record<string, string> = {
  "7": "오락실 펀치",
  "9": "숨겨둔 편지",
  "13": "럭키 드로우",
};

export async function fetchEvents(): Promise<EventItem[]> {
  const data = await getEvents();
  return data.map(mapEventApiItemToEventItem);
}

export async function fetchHomeEvents(): Promise<EventItem[]> {
  const items = await fetchEvents();
  const byId = new Map(items.map((item) => [item.id, item]));
  return HOME_FEATURED_EVENT_IDS.map((id) => {
    const item = byId.get(id);
    if (!item) return null;
    const homeThumbnailUrl = HOME_EVENT_THUMBNAIL_BY_ID[id];
    const homeLabel = HOME_EVENT_LABEL_BY_ID[id];
    if (!homeThumbnailUrl && !homeLabel) return item;
    return { ...item, homeThumbnailUrl, homeLabel };
  }).filter((item): item is EventItem => item != null);
}

export async function fetchEventById(id: string): Promise<EventItem | null> {
  const data = await getEvent(id, { revalidate: 0 });
  if (!data) return null;
  return mapEventApiDetailToEventItem(data);
}
