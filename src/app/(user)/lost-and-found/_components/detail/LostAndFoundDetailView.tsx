"use client";

import Image from "next/image";
import React from "react";
import { type LostItem } from "../../_data/lostAndFoundData";
import GrayBox from "./GrayBox";
import InfoRow from "./InfoRow";
import StatusChip from "./StatusChip";

export default function LostAndFoundDetailView({ item }: { item: LostItem }) {
  return (
    <div className="flex flex-col">
      <div className="flex flex-col p-5 gap-2.5">
        <div>
          <div className="text-[20px] font-bold text-black">{item.title}</div>
          <div className="relative mt-3 w-full aspect-square overflow-hidden bg-gray-200">
            {item.imageUrl ? (
              <Image
                src={item.imageUrl}
                alt={`${item.title} 사진`}
                fill
                priority
                sizes="(max-width: 768px) 100vw, 480px"
                className="object-cover"
              />
            ) : null}
          </div>

          <GrayBox>
            <div className="py-3">
              <InfoRow label="습득 장소" value={item.foundLocation} />
              <div className="h-px w-full bg-white/70" />
              <InfoRow label="습득 시간" value={item.foundAt} />
              <div className="h-px w-full bg-white/70" />
              <InfoRow label="카테고리" value={item.category} />
              <div className="h-px w-full bg-white/70" />
              <InfoRow
                label="상태"
                value={<StatusChip status={item.status} />}
              />
            </div>
          </GrayBox>
        </div>

        {item.descriptionLines && item.descriptionLines.length > 0 && (
          <div className="pt-2.5">
            <GrayBox>
              <div className="flex flex-col p-2.5 text-[13px] font-semibold text-custom-gray opacity-40">
                {item.descriptionLines.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
            </GrayBox>
          </div>
        )}
      </div>
    </div>
  );
}
