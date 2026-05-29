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
    caution,
  } = goods;
  const isSoldOut = status === "SOLD_OUT";
  const cautionItems = caution
    .split(/\r?\n/)
    .flatMap((line) => line.split("."))
    .map((item) => item.trim())
    .filter(Boolean);

  const timeFormat = (time: string) => {
    const [hours, minutes] = time.split(":").map(Number);
    return `${String(hours).padStart(2, "0")}:${String(minutes).padStart(2, "0")}`;
  };
  const salesTime = `${timeFormat(salesOpenTime)} - ${timeFormat(salesCloseTime)}`;

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

      <p className="mt-2.5 text-lg font-semibold flex justify-between border-b pb-2.5 border-[#ECEFF0]">
        <span>가격</span> {price}원
      </p>
      <section className="mb-8">
        <h3 className="font-bold">굿즈 구매시 유의사항</h3>
        {cautionItems.length > 0 && (
          <ul className="list-disc list-outside pl-5 mt-2.5 text-[14px] text-custom-darkgray space-y-1">
            {cautionItems.map((item, index) => (
              <li key={`${index}-${item}`} className="pl-1 whitespace-pre-line">
                {item}
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
