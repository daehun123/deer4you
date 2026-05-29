export type MapCategory =
  | "전체"
  | "무대"
  | "푸드트럭"
  | "운영본부"
  | "흡연구역"
  | "금연구역"
  | "화장실"
  | "의무실"
  | "부스";

export type BoothMapPoint = {
  id: number;
  name: string;
  category: Exclude<MapCategory, "전체">;
  location: string;
  lat: number;
  lng: number;
};

export const boothMapPoints: BoothMapPoint[] = [
  // 화장실
  {
    // 본관
    id: 1,
    name: "화장실 1",
    category: "화장실",
    location: "화장실",
    lat: 36.8338,
    lng: 127.1779,
  },
  {
    // 프홀
    id: 2,
    name: "화장실 2",
    category: "화장실",
    location: "화장실",
    lat: 36.833,
    lng: 127.178239,
  },
  {
    // 한누리
    id: 3,
    name: "화장실 3",
    category: "화장실",
    location: "화장실",
    lat: 36.834,
    lng: 127.1792,
  },
  {
    // 계당관
    id: 4,
    name: "화장실 4",
    category: "화장실",
    location: "화장실",
    lat: 36.8324,
    lng: 127.1788,
  },
  {
    // 학생회관
    id: 5,
    name: "화장실 5",
    category: "화장실",
    location: "화장실",
    lat: 36.83343,
    lng: 127.1801,
  },
  {
    //스포츠센터
    id: 6,
    name: "화장실 6",
    category: "화장실",
    location: "화장실",
    lat: 36.8322,
    lng: 127.18043,
  },
  {
    // 송백관
    id: 7,
    name: "화장실 7",
    category: "화장실",
    location: "화장실",
    lat: 36.83426,
    lng: 127.18004,
  },
  {
    // 디대
    id: 8,
    name: "화장실 8",
    category: "화장실",
    location: "화장실",
    lat: 36.832655,
    lng: 127.181194,
  },
  // 공연장
  {
    // 공연장
    id: 9,
    name: "공연장",
    category: "무대",
    location: "공연장",
    lat: 36.83277,
    lng: 127.1789,
  },
  // 푸드트럭
  {
    // 푸드트럭
    id: 10,
    name: "푸드트럭",
    category: "푸드트럭",
    location: "푸드트럭",
    lat: 36.83313,
    lng: 127.18035,
  },
  // 운영본부
  {
    // 운영본부
    id: 11,
    name: "운영본부",
    category: "운영본부",
    location: "운영본부",
    lat: 36.832834,
    lng: 127.1786,
  },
  // 부스
  {
    id: 12,
    name: "부스",
    category: "부스",
    location: "부스",
    lat: 36.83323,
    lng: 127.17963,
  },
  // 흡연구역
  {
    // 버정 앞
    id: 13,
    name: "흡연구역 1",
    category: "흡연구역",
    location: "흡연구역",
    lat: 36.832172,
    lng: 127.1783,
  },
  {
    // 프홀 앞
    id: 14,
    name: "흡연구역 2",
    category: "흡연구역",
    location: "흡연구역",
    lat: 36.8328,
    lng: 127.17775,
  },
  {
    // 프홀 뒤?
    id: 15,
    name: "금연구역 3",
    category: "금연구역",
    location: "금연구역",
    lat: 36.8333,
    lng: 127.1783,
  },
  {
    // 한누리
    id: 16,
    name: "흡연구역 3",
    category: "흡연구역",
    location: "흡연구역",
    lat: 36.834065,
    lng: 127.179,
  },
  {
    // 식당앞
    id: 17,
    name: "흡연구역 4",
    category: "흡연구역",
    location: "흡연구역",
    lat: 36.8335,
    lng: 127.1795,
  },
  {
    // 흡연구역
    id: 18,
    name: "흡연구역 5",
    category: "흡연구역",
    location: "흡연구역",
    lat: 36.832339,
    lng: 127.181054,
  },
  // 금연구역
  {
    // 원래 본관 피던곳
    id: 19,
    name: "금연구역 1",
    category: "금연구역",
    location: "금연구역",
    lat: 36.833525,
    lng: 127.1784,
  },
  {
    // 푸드트럭 뒤
    id: 20,
    name: "금연구역 2",
    category: "금연구역",
    location: "금연구역",
    lat: 36.83324,
    lng: 127.1807,
  },
  // 의무실
  {
    // 푸드트럭 뒤
    id: 20,
    name: "의무실 1",
    category: "의무실",
    location: "의무실",
    lat: 36.83272,
    lng: 127.179,
  },
  {
    // 푸드트럭 뒤
    id: 20,
    name: "의무실 2",
    category: "의무실",
    location: "의무실",
    lat: 36.83276,
    lng: 127.17879,
  },
];

function averageLatLng(points: BoothMapPoint[]) {
  const fallback = { lat: 36.833678, lng: 127.179155 };
  if (!points.length) return fallback;
  let lat = 0;
  let lng = 0;
  for (const p of points) {
    lat += p.lat;
    lng += p.lng;
  }
  const n = points.length;
  return { lat: lat / n, lng: lng / n };
}

//  홈 지도 미리보기용 -  화장실·흡연 등 제외, 축제 핵심 시설만으로 잡은 중심
export const festivalMapFocusCenter = averageLatLng(
  boothMapPoints.filter((p) =>
    ["무대", "푸드트럭", "운영본부", "부스"].includes(p.category),
  ),
);
