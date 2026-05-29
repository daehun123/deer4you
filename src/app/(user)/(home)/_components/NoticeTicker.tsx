"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";

interface Notice {
  id: number;
  title: string;
  pinned: boolean;
  content: string;
  createdAt: string;
}

export default function NoticeTicker() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const router = useRouter();

  const [emblaRef] = useEmblaCarousel(
    {
      axis: "y",
      loop: true,
      align: "start",
    },
    [Autoplay({ delay: 3000, stopOnInteraction: false })],
  );

  useEffect(() => {
    const fetchNotices = async () => {
      try {
        const response = await fetch(
          process.env.NEXT_PUBLIC_API_BASE_URL + "/notices",
          {
            cache: "no-store",
          },
        );

        if (!response.ok) {
          throw new Error("네트워크 응답에 문제가 있습니다.");
        }

        const data = await response.json();
        setNotices(data);
      } catch (error) {
        console.error("공지사항을 가져오는데 실패했습니다:", error);
      }
    };

    fetchNotices();
  }, []);

  if (notices.length === 0) {
    return (
      <div className="flex items-center justify-between bg-custom-gray px-6.5 py-3 text-white h-11">
        <div className="flex gap-[14px]">
          <span className="font-bold text-[14px] shrink-0 ">공지사항</span>
          <span className="text-[14px] text-white">공지사항이 없습니다.</span>
        </div>
        <button
          onClick={() => router.push("/notice")}
          className="shrink-0 cursor-pointer p-1"
          aria-label="공지사항 전체보기"
        >
          <Image
            src="/home/arrow.svg"
            alt="Arrow Right"
            width={8}
            height={8}
            priority
            className="w-auto h-auto"
          />
        </button>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-between bg-custom-gray px-6.5 py-3 text-white h-11">
      <div className="flex items-center w-full h-full overflow-hidden">
        <span className="font-bold text-[14px] shrink-0 mr-4">공지사항</span>

        <div className="flex-1 h-5 overflow-hidden" ref={emblaRef}>
          <div className="flex flex-col h-full touch-pan-x">
            {notices.map((notice) => (
              <div
                onClick={() => router.push(`/notice?id=${notice.id}`)}
                key={notice.id}
                className="flex-[0_0_100%] min-h-0 flex items-center text-[14px] text-white truncate cursor-pointer hover:underline"
              >
                {notice.title}
              </div>
            ))}
          </div>
        </div>
      </div>

      <button
        onClick={() => router.push("/notice")}
        className="shrink-0 cursor-pointer p-1"
        aria-label="공지사항 전체보기"
      >
        <Image
          src="/home/arrow.svg"
          alt="Arrow Right"
          width={8}
          height={8}
          priority
          className="w-auto h-auto"
        />
      </button>
    </div>
  );
}
