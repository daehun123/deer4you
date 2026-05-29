"use client";

import React from "react";

type Props = {
  label: string;
  value: React.ReactNode;
};

export default function InfoRow({ label, value }: Props) {
  return (
    <div className="flex items-center gap-4 py-2">
      <div className="w-20 text-[12px] font-semibold text-custom-gray opacity-40">
        {label}
      </div>
      <div className="min-w-0 text-[12px] font-normal text-black">{value}</div>
    </div>
  );
}

