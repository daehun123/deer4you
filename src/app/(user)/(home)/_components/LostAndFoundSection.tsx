import Image from "next/image";
import Link from "next/link";
import React from "react";
import SectionLayout from "./SectionLayout";
import { fetchLostItems } from "../../lost-and-found/_data/lostAndFoundData";

export default async function LostAndFoundSection() {
  const items = await fetchLostItems();
  return (
    <SectionLayout title="분실물 안내" link="/lost-and-found">
      {items.slice(0, 3).map((item, idx) => (
        <Link
          key={item.id}
          href={`/lost-and-found/${item.id}`}
          aria-label={`${item.title} 상세로 이동`}
          className="relative block h-[142px] w-[120px] shrink-0 snap-start rounded-lg overflow-hidden bg-[#E0E0E0]  focus:outline-none focus:ring-2 focus:ring-black/20 active:scale-[0.98] transition-transform"
        >
          {item.imageUrl ? (
            <Image
              src={item.imageUrl}
              alt={`${item.title} 썸네일`}
              fill
              sizes="125px"
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
