"use client";

import React, { useState } from "react";
import { useSearchParams } from "next/navigation";
import { Notice } from "@/api/notice";

interface NoticeItemProps {
  notice: Notice;
}

export default function NoticeItem({ notice }: NoticeItemProps) {
  const searchParams = useSearchParams();

  const expandedId = searchParams.get("id");
  const [isOpen, setIsOpen] = useState(
    expandedId ? Number(expandedId) === notice.id : false,
  );

  if (process.env.NODE_ENV === "development") {
    console.log(notice);
  }

  const dateObj = new Date(notice.createdAt);
  const formattedDate =
    dateObj
      .toLocaleDateString("ko-KR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\./g, ".")
      .trim() +
    ` ${String(dateObj.getHours()).padStart(2, "0")}:${String(dateObj.getMinutes()).padStart(2, "0")}`; // 시간까지 표시 추가

  return (
    <div className="border-b border-gray-200">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between px-6.5 py-5 bg-white text-left cursor-pointer"
      >
        <div className="flex flex-col gap-1.5">
          <h3 className="text-[17px] font-bold text-black">
            {notice.pinned ? `[공지] ${notice.title}` : notice.title}
          </h3>
          <p className="text-[13px] text-gray-400">{formattedDate}</p>
        </div>

        <svg
          className={`w-6 h-6 text-black transition-transform duration-300 ${
            isOpen ? "" : "rotate-180"
          }`}
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <circle cx="12" cy="12" r="9" stroke="black" strokeWidth="1.2" />
          <path
            d="M16 13.5L12 9.5L8 13.5"
            stroke="black"
            strokeWidth="1.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>

      <div
        className={`grid transition-[grid-template-rows] duration-500 ease-in-out ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden">
          <div className="bg-custom-lightgray px-6.5 py-6 text-[15px] leading-relaxed text-custom-darkgray break-keep min-h-[80px] whitespace-pre-wrap">
            {notice.content}
          </div>
        </div>
      </div>
    </div>
  );
}
