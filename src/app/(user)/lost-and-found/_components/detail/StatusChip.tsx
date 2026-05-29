"use client";

import React from "react";
import { type LostItem } from "../../_data/lostAndFoundData";

export default function StatusChip({ status }: { status: LostItem["status"] }) {
  const active = status === "보관중";
  return (
    <span
      className={[
        "px-4 py-2 shrink-0 whitespace-nowrap rounded-4xl cursor-pointer text-[14px] font-semibold",
        active ? "bg-custom-blue text-white" : "bg-[#ECEEF0] text-black",
      ].join(" ")}
    >
      {status}
    </span>
  );
}
