interface ScheduleItem {
  id: string;
  date: string;
  start: string;
  end?: string;
  title: string;
  description?: string;
  details?: ScheduleDetailItem[];
}

interface ScheduleDetailItem {
  id: string;
  start: string;
  end?: string;
  title: string;
  description?: string;
}

const scheduleDays = [
  { date: "2026-05-27", label: "5/27 (수)" },
  { date: "2026-05-28", label: "5/28 (목)" },
] as const;

interface LineupItem {
  id: string;
  date: string;
  title: string;
  timeRange?: string;
  imageUrlHome?: string;
  imageUrlSchedule?: string;
}

const LOCATION_STUDENT_UNION = "학생회관 앞";
const LOCATION_AMPHITHEATER = "노천극장";

const scheduleItems: ScheduleItem[] = [
  {
    id: "d1-booth",
    date: "2026-05-27",
    start: "10:00",
    end: "22:00",
    title: "부스 운영",
    description: LOCATION_STUDENT_UNION,
  },
  {
    id: "d1-foodtruck",
    date: "2026-05-27",
    start: "11:00",
    end: "22:00",
    title: "푸드트럭",
    description: LOCATION_STUDENT_UNION,
  },
  {
    id: "d1-1",
    date: "2026-05-27",
    start: "14:20",
    end: "15:20",
    title: "동아리 리허설",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d1-1-1",
        start: "14:20",
        end: "14:35",
        title: "소울로 리허설",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d1-1-2",
        start: "14:35",
        end: "14:50",
        title: "다크니스 리허설",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d1-1-3",
        start: "14:50",
        end: "15:20",
        title: "소래소래 고래고래 리허설",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d1-2",
    date: "2026-05-27",
    start: "15:20",
    end: "15:50",
    title: "최종 점검",
    description: LOCATION_AMPHITHEATER,
  },
  {
    id: "d1-3",
    date: "2026-05-27",
    start: "15:50",
    end: "17:38",
    title: "소래소래 고래고래 가요제",
    description: LOCATION_AMPHITHEATER,
  },
  {
    id: "d1-4",
    date: "2026-05-27",
    start: "17:45",
    end: "18:50",
    title: "동아리 공연",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d1-4-1",
        start: "17:45",
        end: "18:15",
        title: "다크니스",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d1-4-2",
        start: "18:20",
        end: "18:50",
        title: "소울로",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d1-5",
    date: "2026-05-27",
    start: "18:50",
    end: "19:00",
    title: "개회식 세팅 및 오프닝",
    description: LOCATION_AMPHITHEATER,
  },
  {
    id: "d1-6",
    date: "2026-05-27",
    start: "19:00",
    end: "19:05",
    title: "총장님 연설",
    description: LOCATION_AMPHITHEATER,
  },
  {
    id: "d1-7",
    date: "2026-05-27",
    start: "19:05",
    end: "19:15",
    title: "총학생회 소개 및 축사",
    description: LOCATION_AMPHITHEATER,
  },
  {
    id: "d1-8",
    date: "2026-05-27",
    start: "19:25",
    end: "21:15",
    title: "연예인 초청 공연",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d1-8-1",
        start: "19:25",
        end: "19:55",
        title: "키빗업",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d1-8-2",
        start: "20:05",
        end: "20:35",
        title: "쿠기",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d1-8-3",
        start: "20:45",
        end: "21:15",
        title: "루시",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d2-booth",
    date: "2026-05-28",
    start: "10:00",
    end: "22:00",
    title: "부스 운영",
    description: LOCATION_STUDENT_UNION,
  },
  {
    id: "d2-foodtruck",
    date: "2026-05-28",
    start: "11:00",
    end: "22:00",
    title: "푸드트럭",
    description: LOCATION_STUDENT_UNION,
  },
  {
    id: "d2-1",
    date: "2026-05-28",
    start: "16:00",
    end: "17:00",
    title: "동아리 리허설",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d2-1-1",
        start: "16:00",
        end: "16:15",
        title: "BLUE 리허설",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-1-2",
        start: "16:15",
        end: "16:30",
        title: "아리아 리허설",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-1-3",
        start: "16:30",
        end: "16:45",
        title: "CRUNKBRAIN 리허설",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-1-4",
        start: "16:45",
        end: "17:00",
        title: "FREEZE 리허설",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d2-2",
    date: "2026-05-28",
    start: "17:05",
    end: "18:56",
    title: "동아리 공연",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d2-2-1",
        start: "17:05",
        end: "17:15",
        title: "BLUE",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-2-2",
        start: "17:20",
        end: "17:35",
        title: "아리아",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-2-3",
        start: "17:40",
        end: "18:10",
        title: "CRUNKBRAIN",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-2-4",
        start: "18:15",
        end: "18:56",
        title: "FREEZE",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d2-3",
    date: "2026-05-28",
    start: "18:56",
    end: "19:10",
    title: "총학생회 이벤트",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d2-3-1",
        start: "18:56",
        end: "19:02",
        title: "쿠팡이츠 이벤트",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-3-2",
        start: "19:02",
        end: "19:10",
        title: "럭키드로우 이벤트",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
  {
    id: "d2-4",
    date: "2026-05-28",
    start: "19:20",
    end: "21:50",
    title: "연예인 초청 공연",
    description: LOCATION_AMPHITHEATER,
    details: [
      {
        id: "d2-4-1",
        start: "19:20",
        end: "19:50",
        title: "키비츠",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-4-2",
        start: "20:00",
        end: "20:30",
        title: "헤이즈",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-4-3",
        start: "20:40",
        end: "21:10",
        title: "호미들",
        description: LOCATION_AMPHITHEATER,
      },
      {
        id: "d2-4-4",
        start: "21:20",
        end: "21:50",
        title: "스테이씨",
        description: LOCATION_AMPHITHEATER,
      },
    ],
  },
];

const lineupItems: LineupItem[] = [
  {
    id: "keyvitup",
    date: "2026-05-27",
    title: "키빗업",
    timeRange: "19:25 - 19:55",
    imageUrlHome: "/lineup/keyvitup.webp",
    imageUrlSchedule: "/lineup/keyvitup.webp",
  },
  {
    id: "coogie",
    date: "2026-05-27",
    title: "쿠기",
    timeRange: "20:05 - 20:35",
    imageUrlHome: "/lineup/coogie.webp",
    imageUrlSchedule: "/lineup/coogie.webp",
  },
  {
    id: "lucy",
    date: "2026-05-27",
    title: "루시",
    timeRange: "20:45 - 21:15",
    imageUrlHome: "/lineup/home_lucy.webp",
    imageUrlSchedule: "/lineup/lucy.webp",
  },
  {
    id: "keyveatz",
    date: "2026-05-28",
    title: "키비츠",
    timeRange: "19:20 - 19:50",
    imageUrlHome: "/lineup/keyveatz_2.webp",
    imageUrlSchedule: "/lineup/keyveatz_1.webp",
  },
  {
    id: "heize",
    date: "2026-05-28",
    title: "헤이즈",
    timeRange: "20:00 - 20:30",
    imageUrlHome: "/lineup/heize_1.webp",
    imageUrlSchedule: "/lineup/heize_2.webp",
  },
  {
    id: "homies",
    date: "2026-05-28",
    title: "호미들",
    timeRange: "20:40 - 21:10",
    imageUrlHome: "/lineup/home_homies.webp",
    imageUrlSchedule: "/lineup/homies_1.webp",
  },
  {
    id: "stayc",
    date: "2026-05-28",
    title: "스테이씨",
    timeRange: "21:20 - 21:50",
    imageUrlHome: "/lineup/home_stacy.webp",
    imageUrlSchedule: "/lineup/stayc_1.webp",
  },
];

export {
  type LineupItem,
  type ScheduleItem,
  scheduleDays,
  scheduleItems,
  lineupItems,
};
