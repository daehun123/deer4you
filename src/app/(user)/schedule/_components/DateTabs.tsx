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
              "px-4 py-2 shrink-0 whitespace-nowrap rounded-4xl cursor-pointer text-[16px] font-semibold",
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
