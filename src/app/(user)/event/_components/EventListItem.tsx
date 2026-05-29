"use client";

import Link from "next/link";
import Image from "next/image";
import React from "react";
import { type EventItem } from "../_data/eventData";

type Props = {
  item: EventItem;
  priority?: boolean;
};

function Thumbnail({
  src,
  alt,
  priority,
}: {
  src: string;
  alt: string;
  priority?: boolean;
}) {
  return (
    <div className="relative h-25 w-25 shrink-0 overflow-hidden rounded bg-gray-200">
      <Image
        src={src}
        alt={alt}
        fill
        sizes="100px"
        className="object-cover"
        priority={Boolean(priority)}
        loading={priority ? "eager" : "lazy"}
      />
    </div>
  );
}

export default function EventListItem({ item, priority }: Props) {
  const thumbSrc = item.listThumbnailUrl ?? item.imageUrl;
  return (
    <Link href={`/event/${item.id}`} className="flex items-start gap-5">
      {thumbSrc ? (
        <Thumbnail
          src={thumbSrc}
          alt={`${item.title} 썸네일`}
          priority={priority}
        />
      ) : (
        <div className="h-25 w-25 shrink-0 overflow-hidden rounded bg-gray-200" />
      )}
      <div className="min-w-0 flex flex-col">
        <div className="text-[18px] font-bold leading-tight text-custom-gray truncate">
          {item.title}
        </div>
        <div className="mt-[11px] flex flex-col gap-1 text-[12px] font-semibold text-custom-gray opacity-40">
          {!item.hideTimeRange ? (
            <div className="flex items-center gap-1">
              <span>운영 시간 :</span>
              <span>{item.timeRange}</span>
            </div>
          ) : null}
          <div className="flex items-center gap-1">
            <span>장소 :</span>
            <span className="truncate">{item.location}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
