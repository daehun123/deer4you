import { apiFetchJson } from "./client";

export interface Goods {
  id: number;
  name: string;
  description: string;
  price: number;
  location: string;
  status: "ON_SALE" | "SOLD_OUT";
  imageUrls: string[];
  createdAt: string;
}

export interface GoodsDetail extends Goods {
  salesOpenTime: string;
  salesCloseTime: string;
}

export async function getGoods() {
  return await apiFetchJson<Goods[]>("/goods", { cache: "no-store" });
}

export async function getGoodsById(id: number) {
  return await apiFetchJson<GoodsDetail>(`/goods/${id}`, { cache: "no-store" });
}

export async function updateGoodsStatus(
  id: number,
  status: "ON_SALE" | "SOLD_OUT",
) {
  return await apiFetchJson<null>(`/admin/goods/${id}/status`, {
    method: "PATCH",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ status }),
  });
}
