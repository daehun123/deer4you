"use client";
import { usePathname, useRouter } from "next/navigation";
import React from "react";

export default function Header() {
  const pathname = usePathname();
  const router = useRouter();

  const getHeaderTitle = () => {
    if (pathname.startsWith("/admin/notice/write-and-edit"))
      return "공지 등록 및 수정";
    if (pathname.startsWith("/admin/event/write-and-edit"))
      return "이벤트 등록 및 수정";
    if (pathname.startsWith("/admin/lost/write-and-edit"))
      return "분실물 등록 및 수정";
    if (pathname.startsWith("/admin/goods/write-and-edit"))
      return "굿즈 등록 및 수정";

    if (pathname.startsWith("/event/") && pathname !== "/event")
      return "이벤트 상세";
    if (pathname.startsWith("/booths/") && pathname !== "/booths")
      return "부스 상세";
    if (
      pathname.startsWith("/lost-and-found/") &&
      pathname !== "/lost-and-found"
    )
      return "분실물 상세";
    if (pathname.startsWith("/goods/") && pathname !== "/goods")
      return "굿즈 상세";

    switch (pathname) {
      case "/":
        return "홈";
      case "/booths":
        return "부스";
      case "/map":
        return "지도";
      case "/schedule":
        return "일정";
      case "/notice":
        return "공지사항";
      case "/event":
        return "이벤트";
      case "/lost-and-found":
        return "분실물";
      case "/goods":
        return "굿즈";
      case "/about":
        return "Deer for U: ARCHIVE";
      case "/admin/login":
        return "로그인";
      case "/admin":
        return "관리자";
      case "/admin/notice":
        return "공지 관리";
      case "/admin/event":
        return "이벤트 관리";
      case "/admin/lost":
        return "분실물 관리";
      case "/admin/goods":
        return "굿즈 관리";
      default:
        return "에러";
    }
  };

  if (pathname === "/") {
    return null;
  }
  return (
    <header className="sticky top-0 z-50 flex w-full max-w-md items-center justify-between bg-white px-5 pb-5 pt-5">
      <button
        onClick={() => router.back()}
        className="flex h-8 w-8 items-center justify-center rounded-full text-black hover:bg-gray-100 transition-colors cursor-pointer"
        aria-label="뒤로 가기"
      >
        <svg
          width="9"
          height="16"
          viewBox="0 0 9 16"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M7.75 14.75L0.75 7.75L7.75 0.75"
            stroke="black"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </button>
      <h1 className="flex-1 text-center text-[20px] font-semibold text-black">
        {getHeaderTitle()}
      </h1>

      <div className="h-8 w-8"></div>
    </header>
  );
}
