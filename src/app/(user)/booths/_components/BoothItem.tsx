"use client";
import React from "react";
import { BoothData } from "../_data/boothData";
import Image from "next/image";
import { useRouter } from "next/navigation";

interface BoothItemProps {
  booth: BoothData;
}

export default function BoothItem({ booth }: BoothItemProps) {
  const router = useRouter();

  return (
    <div
      className="cursor-pointer hover:shadow-lg rounded-xl overflow-hidden w-full flex flex-col"
      onClick={() => {
        if (booth.category === "푸드트럭") {
          router.push(`/booths/foodtrucks/${booth.id - 100}`);
        } else {
          router.push(`/booths/${booth.id}`);
        }
      }}
    >
      <div className="relative w-full h-56">
        <Image
          src={booth.imageUrl}
          alt={booth.name}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="p-4 bg-white grow">
        <p className="text-xl font-bold">{booth.name}</p>
        <p className="mb-4 text-custom-darkgray">{booth.time}</p>
        <p className="text-custom-darkgray">{booth.location}</p>
      </div>
    </div>
  );
}
