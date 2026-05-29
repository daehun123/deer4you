"use client";

import React from "react";
import { type LostItem } from "../../_data/lostAndFoundData";

export default function StatusChip({ status }: { status: LostItem["status"] }) {
  const active = status === "보관중";
  return (
    <span
      className={[
        "inline-flex items-center justify-center rounded-md px-2 py-1 text-[12px] font-bold",
        active ? "bg-custom-blue text-white" : "bg-[#ECEEF0] text-black",
      ].join(" ")}
    >
      {status}
    </span>
  );
}

