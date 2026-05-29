import React from "react";
import GoodsListItem from "./GoodsListItem";
import { getGoods } from "@/api/goods";

export default async function GoodsList() {
  const { ok, data: goodsList } = await getGoods();

  if (!ok || !goodsList || goodsList.length === 0) {
    return (
      <div className="flex flex-col gap-6 p-8.5 text-center text-gray-500">
        등록된 굿즈가 없습니다.
      </div>
    );
  }

  return (
    <div className=" flex flex-col gap-6 p-8.5">
      {goodsList.map((goods) => (
        <GoodsListItem key={goods.id} goods={goods} />
      ))}
    </div>
  );
}
