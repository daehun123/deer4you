import type { FestivalListItem } from "./types";

// 학생회 부스 리스트

export const schoolBoothList: FestivalListItem[] = [
  {
    id: 1,
    boothNo: 6,
    zone: "A",
    host: "총학생회",
    name: "오락실 부스",
    time: "DAY 1 11:30 ~ 17:00 · DAY 2 11:30 ~ 17:00",
    location: "소나무숲 앞 A-3-11",
    description:
      "방전된 에너지 여기서 풀 충전! 스트레스는 날리고 행운은 잡으세요",
    menu: [
      { name: "펀치 1회", price: "1,000원" },
      { name: "타이머 맞추기 1회", price: "1,000원" },
    ],
    imageUrl: "/map/school/school-1.webp",
  },
  {
    id: 2,
    boothNo: 7,
    zone: "A",
    host: "총학생회",
    name: "숨겨둔 편지",
    time: "DAY 1 11:30 ~ 17:00 · DAY 2 11:30 ~ 17:00",
    location: "소나무숲 앞 A-3-12",
    description:
      "내 마음을 엽서에 담아 보내고, 누군가의 이야기에 살짝 공감해보는 시간!",
    menu: [{ name: "편지 작성 1회", price: "500원" }],
    imageUrl: "/map/school/school-2.webp",
  },
  {
    id: 3,
    boothNo: 7,
    zone: "A",
    host: "총학생회",
    name: "폴라로이드",
    time: "DAY 1 11:30 ~ 17:00 · DAY 2 11:30 ~ 17:00",
    location: "소나무숲 앞 A-3-12",
    description: "폴라로이드",
    imageUrl: "/map/school/school-3.webp",
  },
];
