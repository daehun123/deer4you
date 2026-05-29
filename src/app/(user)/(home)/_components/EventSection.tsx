import React from "react";
import Link from "next/link";
import Image from "next/image";
import SectionLayout from "./SectionLayout";
import { fetchEvents } from "../../event/_data/eventData";

export default async function EventSection() {
  const items = await fetchEvents();
  return (
    <SectionLayout title="대동제 한정 이벤트" link="/event">
      {items.map((item, idx) => (
        <Link
          key={item.id}
          href={`/event/${item.id}`}
          aria-label={`${item.title} 상세로 이동`}
          className="relative block w-30 h-30 shrink-0 snap-start overflow-hidden bg-[#E0E0E0] rounded-lg focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.98] transition-transform"
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={`${item.title} 썸네일`}
              fill
              sizes="120px"
              className="object-cover"
              priority={idx === 0}
              loading={idx === 0 ? "eager" : "lazy"}
            />
          ) : null}
        </Link>
      ))}
    </SectionLayout>
  );
}
