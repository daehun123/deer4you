"use client";

import React from "react";

export default function LostAndFoundEmptyResult() {
  return (
    <div className="flex flex-col items-center justify-center pt-14">
      <div
        role="img"
        aria-label="검색 결과 없음"
        className="relative w-full max-w-[332px] h-[214px] rounded-lg overflow-hidden"
        style={{
          background: 'url("/error.svg") #fff 50% / contain no-repeat',
        }}
      >
        <div aria-hidden="true" className="absolute inset-0 bg-white/55" />
      </div>
      <div className="mt-12 text-center">
        <div className="text-[18px] font-bold text-black">
          검색하신 결과가 없습니다.
        </div>
        <div className="mt-2 whitespace-pre-line text-[15px] font-semibold text-custom-gray opacity-50">
          검색어를 수정 후{"\n"}다시 검색해주세요.
        </div>
      </div>
    </div>
  );
}
