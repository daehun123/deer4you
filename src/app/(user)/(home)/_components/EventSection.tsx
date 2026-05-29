import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionLayout from "./SectionLayout";
import { fetchHomeEvents } from "../../event/_data/eventData";

export default async function EventSection() {
  const items = await fetchHomeEvents();
  return (
    <SectionLayout title="대동제 한정 이벤트" link="/event" scrollable={false}>
      {items.map((item, idx) => {
        const thumbSrc =
          item.homeThumbnailUrl ?? item.listThumbnailUrl ?? item.imageUrl;
        const label = item.homeLabel ?? item.title;
        return (
          <Link
            key={item.id}
            href={`/event/${item.id}`}
            aria-label={`${label} 상세로 이동`}
            className="flex w-[95px] flex-col items-start bg-transparent focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.98] transition-transform rounded-lg"
          >
            <div className="relative h-[90px] w-[95px] overflow-hidden bg-transparent">
              {thumbSrc ? (
                <Image
                  src={thumbSrc}
                  alt={`${label} 썸네일`}
                  fill
                  sizes="95px"
                  className="object-contain"
                  priority={idx === 0}
                  loading={idx === 0 ? "eager" : "lazy"}
                />
              ) : null}
            </div>
            <span className="mt-2 w-full text-center text-[12px] font-semibold leading-tight text-custom-gray">
              {label}
            </span>
          </Link>
        );
      })}
    </SectionLayout>
  );
}
