"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

const banners = [
  "/home/banner/main_banner.webp",
  "/home/banner/goods_banner.webp",
  "/home/banner/notice_banner.webp",
  "/home/banner/booths_banner.webp",
  "/home/banner/event_banner.webp",
  "/home/banner/schedule_banner.webp",
];

export default function MainBanner() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 2000, stopOnInteraction: false }),
  ]);

  const [currentIndex, setCurrentIndex] = useState(0);

  const onSelect = useCallback(() => {
    if (!emblaApi) return;
    setCurrentIndex(emblaApi.selectedScrollSnap());
  }, [emblaApi]);

  useEffect(() => {
    if (!emblaApi) return;

    emblaApi.on("select", onSelect);

    emblaApi.on("reInit", onSelect);
  }, [emblaApi, onSelect]);

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex touch-pan-y">
          {banners.map((src, index) => (
            <div key={index} className="flex-[0_0_100%] min-w-0 relative">
              <Image
                src={src}
                priority={index === 0}
                alt={`Main Banner ${index + 1}`}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
