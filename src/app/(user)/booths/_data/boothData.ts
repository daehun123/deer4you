import type { FestivalListItem } from "@/data/festival/types";
import { experienceList } from "@/data/festival/experiences";
import { externalCompanyList } from "@/data/festival/external-company";
import { foodTruckList } from "@/data/festival/food-trucks";
import { schoolBoothList } from "@/data/festival/school-booths";

export interface BoothData {
  id: number;
  name: string; // 부스 이름
  category: string; // 필터 기준 (학과, 동아리, 푸드트럭 등)
  host: string; // 주체 (예: 컴퓨터공학과, 댄스동아리)
  time: string; // 운영 시간
  location: string; // 위치 (예: 노천극장, 학생회관 앞)
  imageUrl: string; // 부스 썸네일 이미지
}

export const FOOD_TRUCK_ID_OFFSET = 100;
export const EXTERNAL_BOOTH_ID_OFFSET = 200;
export const SCHOOL_BOOTH_ID_OFFSET = 300;

const experienceCategoryById: Record<number, string> = {
  // AR∙VR 미디어디자인 전공
  1: "학과",
  // CCC
  2: "동아리",
  // CRUNK BRAIN
  3: "동아리",
  // RENEW
  4: "동아리",
  // STEAL
  5: "동아리",
  // 건설시스템공학과
  6: "학과",
  // 겟아웃
  7: "동아리",
  // 경영공학과
  8: "학과",
  // 테온
  9: "동아리",
  // 교육방송국 SMBS
  10: "동아리",
  // 그래픽미디어랩
  11: "동아리",
  // 그린화학공학과
  12: "학과",
  // 다다름
  13: "동아리",
  // 다크니스
  14: "동아리",
  // 마법연구회
  15: "동아리",
  // 무대미술전공
  16: "학과",
  // 간호학과
  17: "학과",
  // 시스템반도체공학과
  18: "학과",
  // 실오라기
  19: "동아리",
  // 싸이클링 히트
  20: "동아리",
  // 아소부
  21: "동아리",
  // 연극전공
  22: "학과",
  // 옴므, 팜므, 헤비메탈
  23: "동아리",
  // 요쿡
  24: "동아리",
  // 연
  25: "동아리",
  // 인더스트리얼디자인전공
  26: "학과",
  // 치즈
  27: "동아리",
  // 패션디자인전공
  28: "학과",
  // 폴리오
  29: "동아리",
  // 글로벌금융경영학부
  30: "학과",
  // 소프트웨어학과
  31: "학과",
  // 그린스마트시티학과
  32: "학과",
  // 디어스
  33: "동아리",
  // CLUB C
  34: "동아리",
  // 스포츠융합학부
  35: "학과",
};

function festivalItemToBoothData(
  item: FestivalListItem,
  category: string,
  id: number,
): BoothData {
  return {
    id,
    name: item.name,
    category,
    host: item.host ?? "—",
    time: item.time ?? "—",
    location: item.location ?? "—",
    imageUrl: item.imageUrl,
  };
}

function experienceItemToBoothData(item: FestivalListItem): BoothData {
  const category = experienceCategoryById[item.id] ?? "동아리";
  return festivalItemToBoothData(item, category, item.id);
}

function foodTruckItemToBoothData(item: FestivalListItem): BoothData {
  return festivalItemToBoothData(
    item,
    "푸드트럭",
    item.id + FOOD_TRUCK_ID_OFFSET,
  );
}

function externalItemToBoothData(item: FestivalListItem): BoothData {
  return festivalItemToBoothData(
    item,
    "외부업체",
    item.id + EXTERNAL_BOOTH_ID_OFFSET,
  );
}

function schoolItemToBoothData(item: FestivalListItem): BoothData {
  return festivalItemToBoothData(
    item,
    "총학부스",
    item.id + SCHOOL_BOOTH_ID_OFFSET,
  );
}

const experienceBooths = experienceList.map(experienceItemToBoothData);
const foodTruckBooths = foodTruckList.map(foodTruckItemToBoothData);
const externalBooths = externalCompanyList.map(externalItemToBoothData);
const schoolBooths = schoolBoothList.map(schoolItemToBoothData);

export const dummyBooths: BoothData[] = [
  ...schoolBooths,
  ...experienceBooths,
  ...foodTruckBooths,
  ...externalBooths,
];
