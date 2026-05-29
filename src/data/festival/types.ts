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
};
