"use client";

import React from "react";

type Props = {
  value: string;
  onChange: (next: string) => void;
};

export default function LostAndFoundSearchInput({ value, onChange }: Props) {
  return (
    <div className="mt-3">
      <input
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="제목을 입력하세요"
        className="h-10 w-full rounded bg-custom-lightgray px-3 text-[14px] font-semibold text-custom-gray placeholder:text-custom-darkgray outline-none"
      />
    </div>
  );
}

