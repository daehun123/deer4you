"use client";
import React, { useEffect } from "react";
import GoodsItem from "./_components/GoodsItem";
import { getGoods, Goods } from "@/api/goods";

export default function AdminGoodsPage() {
  const [goodsList, setGoodsList] = React.useState<Goods[]>([]);

  useEffect(() => {
    const fetchGoods = async () => {
      try {
        const response = await getGoods();
        setGoodsList(response.data || []);
      } catch (error) {
        console.error("굿즈 목록 조회 예외 발생:", error);
      }
    };
    fetchGoods();
  }, []);

  return (
    <div className="flex flex-col p-4 space-y-4">
      {goodsList.map((goods) => (
        <GoodsItem key={goods.id} goods={goods} />
      ))}
    </div>
  );
}
