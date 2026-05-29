export type BoothPlace = {
  label: string;
  boothNo?: number;
  zone: "A" | "B" | "C" | "additional";
  location: string;
};

export type FestivalListItem = {
  id: number;
  boothNo?: number;
  name: string;
  host?: string;
  time?: string;
  location?: string;
  description: string;
  imageUrl: string;
  menu?: {
    name: string;
    price: string;
  }[];
  etc?: string;
  zone: "A" | "B" | "C" | "additional";
  /** 복수 위치 부스 (예: 포토이즘 B·추가 구역) */
  boothPlaces?: BoothPlace[];
};
