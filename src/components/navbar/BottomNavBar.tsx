"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { BoothIcon, MapIcon, HomeIcon, ScheduleIcon, NoticeIcon } from "./Icon";

export default function BottomNavBar() {
  const pathname = usePathname();
  const isActive = (path: string) => {
    if (path === "/") return pathname === "/";
    return pathname.startsWith(path);
  };

  return (
    <nav className="fixed bottom-0 z-50 flex h-17.5 w-full max-w-md items-center justify-between rounded-t-2xl bg-white px-10   ">
      <Link
        href="/booths"
        className={`flex flex-col items-center text-sm gap-1 w-7.25 h-12.25 justify-between transition-colors ${isActive("/booths") ? "text-custom-blue" : "text-custom-gray"}`}
      >
        <BoothIcon />
        <span
          className={`text-[12px] font-bold ${isActive("/booths") ? "text-custom-blue" : "text-custom-gray"}`}
        >
          부스
        </span>
      </Link>

      <Link
        href="/map"
        className={`flex flex-col items-center text-sm gap-1 w-7.25 h-12.25 justify-between transition-colors ${isActive("/map") ? "text-custom-blue" : "text-custom-gray"}`}
      >
        <MapIcon />
        <span
          className={`text-[12px] font-bold ${isActive("/map") ? "text-custom-blue" : "text-custom-gray"}`}
        >
          지도
        </span>
      </Link>

      <Link
        href="/"
        className={`flex flex-col items-center text-sm gap-1 w-7.25 h-12.25 justify-between transition-colors ${isActive("/") || isActive("/about") ? "text-custom-blue" : "text-custom-gray"}`}
      >
        <HomeIcon />
        <span
          className={`text-[12px] font-bold ${isActive("/") || isActive("/about") ? "text-custom-blue" : "text-custom-gray"}`}
        >
          홈
        </span>
      </Link>

      <Link
        href="/schedule"
        className={`flex flex-col items-center text-sm gap-1 w-7.25 h-12.25 justify-between transition-colors ${isActive("/schedule") ? "text-custom-blue" : "text-custom-gray"}`}
      >
        <ScheduleIcon />
        <span
          className={`text-[12px] font-bold ${isActive("/schedule") ? "text-custom-blue" : "text-custom-gray"}`}
        >
          일정
        </span>
      </Link>

      <Link
        href="/notice"
        className={`flex flex-col items-center text-sm gap-1 w-7.25 h-12.25 justify-between transition-colors ${isActive("/notice") ? "text-custom-blue" : "text-custom-gray"}`}
      >
        <NoticeIcon />
        <span
          className={`text-[12px] font-bold ${isActive("/notice") ? "text-custom-blue" : "text-custom-gray"}`}
        >
          공지
        </span>
      </Link>
    </nav>
  );
}
