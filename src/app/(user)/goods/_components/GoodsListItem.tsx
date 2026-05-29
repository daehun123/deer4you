"use client";
import Image from "next/image";
import React from "react";
import { Goods } from "@/api/goods";
import { useRouter } from "next/navigation";
import SoldOutState from "./SoldOutState";

interface GoodsListItemProps {
  goods: Goods;
}

export default function GoodsListItem({ goods }: GoodsListItemProps) {
  const router = useRouter();
  const { id, imageUrls, name, location, status } = goods;

  const imgUrl = imageUrls && imageUrls.length > 0 ? imageUrls[0] : "";
  const isSoldOut = status === "SOLD_OUT";

  return (
    <div className="flex flex-row">
      {imgUrl ? (
        <Image
          src={imgUrl}
          alt={name}
          width={100}
          height={100}
          priority
          className="w-25 h-25 object-cover cursor-pointer shrink-0 border border-gray-100 rounded-md"
          onClick={() => router.push(`/goods/${id}`)}
        />
      ) : (
        <div
          className="w-25 h-25 bg-gray-200 cursor-pointer shrink-0 rounded-md"
          onClick={() => router.push(`/goods/${id}`)}
        />
      )}
      <div className="flex flex-col justify-between py-1 ml-5 flex-1">
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[18px] font-bold text-black">{name}</h3>
          <p className="text-[13px] text-gray-500">{location}</p>
        </div>

        <SoldOutState isSoldOut={isSoldOut} />
      </div>
    </div>
  );
}
