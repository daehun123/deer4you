import React from "react";
import { GoodsDetail } from "@/api/goods";
import SoldOutState from "../../_components/SoldOutState";

interface GoodsDetailBoardProps {
  goods: GoodsDetail;
}

export default function GoodsDetailBoard({ goods }: GoodsDetailBoardProps) {
  const {
    name,
    description,
    price,
    location,
    status,
    salesOpenTime,
    salesCloseTime,
  } = goods;
  const isSoldOut = status === "SOLD_OUT";
  const salesTime = `${salesOpenTime} - ${salesCloseTime}`;

  return (
    <div className="px-5.25 flex flex-col gap-2.5">
      <h1 className="text-xl font-semibold">{name}</h1>
      <p className="mt-2.5 text-custom-darkgray text-[14px] bg-custom-lightgray p-2.5">
        {description}
      </p>
      <div className="flex flex-col gap-3 mt-4">
        <div className="flex items-center">
          <span className="w-28 text-[14px] text-custom-darkgray shrink-0">
            구매 장소
          </span>
          <span className="text-[14px] text-black">{location}</span>
        </div>

        <div className="flex items-center">
          <span className="w-28 text-[14px] text-custom-darkgray shrink-0">
            구매 가능시간
          </span>
          <span className="text-[14px] text-black">{salesTime}</span>
        </div>

        <div className="flex items-center">
          <span className="w-28 text-[14px] text-custom-darkgray shrink-0">
            상태
          </span>
          <div>
            <SoldOutState isSoldOut={isSoldOut} />
          </div>
        </div>
      </div>

      <p className="mt-2.5 text-lg font-semibold flex justify-between">
        <span>가격</span> {price}원
      </p>
      <section>
        <h3 className="font-bold">굿즈 구매시 유의사항</h3>
        <ul className="list-disc list-inside mt-2.5 text-[14px] text-custom-darkgray">
          <li>굿즈는 선착순으로 판매됩니다.</li>
          <li>굿즈는 현금으로만 구매 가능합니다.</li>
          <li>굿즈 구매 후 환불은 불가능합니다.</li>
          <li>굿즈는 재고 소진 시 판매가 종료됩니다.</li>
        </ul>
      </section>
    </div>
  );
}
