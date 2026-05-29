"use client";

import Image from "next/image";
import React from "react";
import { type LineupItem } from "../_data/scheduleData";

function SkeletonPoster() {
  return <div className="h-[158px] w-full rounded bg-gray-200" />;
}

type Props = {
  items: LineupItem[];
};

const scheduleImagePosition: Record<string, string> = {
  lucy: "object-[center_55%]",
  keyvitup: "object-[center_50%]",
};

export default function LineupSection({ items }: Props) {
  return (
    <section className="pb-6.25">
      <h3 className=" mb-7.5 text-[21px] font-bold text-black">라인업</h3>
      <div className=" flex flex-col gap-5">
        {items.map((li, index) => (
          <div key={li.id}>
            {li.imageUrlSchedule ? (
              <div className="relative h-[220px] w-full overflow-hidden rounded bg-gray-200">
                <Image
                  src={li.imageUrlSchedule}
                  alt={li.title}
                  fill
                  className={`object-cover ${scheduleImagePosition[li.id] ?? "object-[center_20%]"}`}
                  sizes="(max-width: 768px) 100vw, 640px"
                  loading={index === 0 ? "eager" : "lazy"}
                />
              </div>
            ) : (
              <SkeletonPoster />
            )}
            <div className="mt-3 text-[18px] font-bold text-custom-gray">
              {li.title}
            </div>
            {li.timeRange && (
              <div className="mt-1 text-[12px] font-semibold text-custom-gray opacity-40">
                {li.timeRange}
              </div>
            )}
          </div>
        ))}

        {items.length === 0 && (
          <div className="text-[12px] font-semibold text-custom-darkgray">
            라인업이 아직 공개되지 않았어요.
          </div>
        )}
      </div>
    </section>
  );
}
