"use client";

import Image from "next/image";
import React from "react";
import { type EventItem } from "../_data/eventData";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[20px] font-bold text-black">{children}</h3>;
}

function GrayBox({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 rounded bg-custom-lightgray">{children}</div>;
}

function toLines(text: string) {
  return text
    .split(/\r?\n/)
    .map((v) => v.trim())
    .filter(Boolean);
}

export default function EventDetailView({ item }: { item: EventItem }) {
  const contentLines = item.content ? toLines(item.content) : undefined;
  const descriptionLines =
    item.descriptionLines && item.descriptionLines.length > 0
      ? item.descriptionLines
      : contentLines;
  const bannerSrc = item.imageUrl;

  return (
    <div className="flex flex-col">
      <div className="relative h-[184px] w-full bg-gray-200">
        {bannerSrc ? (
          <Image
            src={bannerSrc}
            alt={`${item.title} 배너`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col p-5 gap-2.5">
        <div>
          <div className="text-[20px] font-bold text-black">{item.title}</div>
          <div className="mt-1.5 flex flex-col  gap-0.5 text-[13px] font-normal text-custom-darkgray ">
            <div>
              <span>{item.timeRange}</span>
            </div>
            <div>
              <span>{item.location}</span>
            </div>
          </div>

          {descriptionLines && descriptionLines.length > 0 && (
            <GrayBox>
              <div className="flex flex-col p-2.5  text-[13px] font-semibold text-custom-gray opacity-40">
                {descriptionLines.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
            </GrayBox>
          )}
        </div>
        <div className="pt-2.5">
          <SectionTitle>진행 방법</SectionTitle>
          <div className="flex flex-col">
            {(item.howToSteps ?? []).map((s) => (
              <div
                key={s}
                className="border-b border-[#ECEEF0] py-2 text-[16px] font-semibold text-black"
              >
                {s}
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col pt-2.5 gap-2.5">
          <SectionTitle>혜택 안내</SectionTitle>
          <div className="flex flex-col ">
            <div className="text-[14px] font-bold text-black">
              {item.benefitTitle ?? "혜택 안내"}
            </div>
            {item.benefitPlaceholder && (
              <div className="h-[170px] w-full rounded bg-gray-200" />
            )}
          </div>
        </div>

        <div>
          <div className="mt-2 text-[13px] font-bold text-black">
            이벤트 유의사항
          </div>
          <ul className="mt-2.5 list-disc space-y-2 pl-5 text-[12px]  text-custom-darkgray ">
            {(item.notes ?? []).map((n) => (
              <li key={n}>{n}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
