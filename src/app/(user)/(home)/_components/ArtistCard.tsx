import Image from "next/image";
import React from "react";

interface ArtistCardProps {
  name: string;
  imageUrl: string;
  date: string;
}

export default function ArtistCard({ name, imageUrl, date }: ArtistCardProps) {
  return (
    <div className="flex flex-col items-center min-w-35 shrink-0">
      <Image
        src={imageUrl}
        alt={name}
        width={140}
        height={200}
        priority
        className="rounded-[14px] w-35 h-50 object-cover mb-2"
      />
      <h3 className="text-[14px] font-bold text-black">{name}</h3>
      <span className="text-[12px] text-custom-gray">{date}</span>
    </div>
  );
}
