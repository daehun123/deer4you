"use client";
import Image from "next/image";
import React from "react";
import { Goods, updateGoodsStatus } from "@/api/goods";

interface GoodsItemProps {
  goods: Goods;
}

export default function GoodsItem({ goods }: GoodsItemProps) {
  const { id, name, description, status, imageUrls } = goods;
  const [soldOut, setSoldOut] = React.useState(status === "SOLD_OUT");

  const toggleSoldOut = async () => {
    const newStatus = soldOut ? "ON_SALE" : "SOLD_OUT";
    const previousSoldOut = soldOut;

    setSoldOut(!previousSoldOut);

    try {
      const response = await updateGoodsStatus(id, newStatus);
      if (!response.ok) {
        throw new Error("상태 변경 실패");
      }
    } catch (error) {
      console.error(error);
      alert("상태를 변경하는 중 오류가 발생했습니다.");
      setSoldOut(previousSoldOut);
    }
  };

  const imgUrl =
    imageUrls && imageUrls.length > 0 ? imageUrls[0] : "/Goods/goods1.png"; // Fallback image

  return (
    <div className="relative flex flex-row items-center space-x-4 border-b pb-4">
      <Image
        priority
        width={200}
        height={200}
        src={imgUrl}
        alt={name}
        className="h-32 w-32 aspect-square object-cover rounded-md bg-gray-100"
      />
      <div className="flex flex-col gap-2">
        <h3 className="mt-2 text-lg font-semibold">{name}</h3>
        <p className="text-sm text-gray-600">{description}</p>
        {soldOut === true ? (
          <button
            onClick={toggleSoldOut}
            className="mt-2 rounded bg-red-500 px-4 py-2 text-sm text-white font-bold w-fit"
          >
            재고소진
          </button>
        ) : (
          <button
            onClick={toggleSoldOut}
            className="mt-2 rounded bg-green-500 px-4 py-2 text-sm text-white font-bold w-fit"
          >
            판매중
          </button>
        )}
      </div>
    </div>
  );
}
