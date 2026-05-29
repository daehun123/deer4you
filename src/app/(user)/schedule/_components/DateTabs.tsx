"use client";

import React from "react";

type Props = {
  days: readonly { date: string; label: string }[];
  selectedDate: string;
  onSelect: (date: string) => void;
};

export default function DateTabs({ days, selectedDate, onSelect }: Props) {
  return (
    <div className="mt-2 flex gap-3">
      {days.map((d) => {
        const active = d.date === selectedDate;
        return (
          <button
            key={d.date}
            type="button"
            onClick={() => onSelect(d.date)}
            className={[
              "rounded-full h-8 px-2.5 py-1 text-[16px] font-bold transition-colors items-center",
              active
                ? "bg-custom-blue text-white"
                : "bg-custom-lightgray text-custom-darkgray",
            ].join(" ")}
          >
            {d.label}
          </button>
        );
      })}
    </div>
  );
}
