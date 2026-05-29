"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useRouter } from "next/navigation";

const banners = [
  { src: "/home/banner/main_banner.webp", href: "/about" },
  { src: "/home/banner/goods_banner.webp", href: "/goods" },
  { src: "/home/banner/notice_banner.webp", href: "/notice" },
  { src: "/home/banner/booths_banner.webp", href: "/booths" },
  { src: "/home/banner/event_banner.webp", href: "/event" },
  { src: "/home/banner/schedule_banner.webp", href: "/schedule" },
];

export default function MainBanner() {
  const router = useRouter();
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
          {banners.map((banner, index) => (
            <button
              key={banner.src}
              type="button"
              className="flex-[0_0_100%] min-w-0 relative cursor-pointer"
              onClick={() => router.push(banner.href)}
            >
              <Image
                src={banner.src}
                priority={index === 0}
                alt={`Main Banner ${index + 1}`}
                width={1200}
                height={400}
                className="w-full h-auto object-cover"
              />
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
