import React from "react";
import NoticeBody from "./_components/NoticeBody";
import Link from "next/link";

export default function NoticePage() {
  return (
    <div className="flex-1 overflow-y-auto ">
      <NoticeBody />
      <div className="fixed bottom-32 w-full max-w-md pointer-events-none z-50">
        <div className="relative w-full h-full">
          <Link
            href="/lost-and-found"
            className="absolute right-6 bottom-0 flex flex-col items-center justify-center w-21 h-21 bg-[#4285F4] rounded-[26px] shadow-[0_8px_24px_rgba(66,133,244,0.4)] text-white hover:bg-blue-600 transition-colors pointer-events-auto"
          >
            <span className=" mb-1 rounded-full  bg-white/40 w-9 h-9 flex items-center justify-center">
              <p className="text-[20px] font-bold leading-none ">!</p>
            </span>
            <span className="text-[16px] font-bold tracking-tight">분실물</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
