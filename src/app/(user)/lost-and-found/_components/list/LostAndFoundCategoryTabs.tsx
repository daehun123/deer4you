"use client";

import React from "react";
import {
  type LostItemCategory,
  lostItemCategories,
} from "../../_data/lostAndFoundData";

type Props = {
  value: LostItemCategory;
  onChange: (next: LostItemCategory) => void;
};

export default function LostAndFoundCategoryTabs({ value, onChange }: Props) {
  return (
    <div className="mt-2.5 -mx-6.25 px-6.25">
      <div className="flex gap-2 overflow-x-auto scrollbar-hide">
        {lostItemCategories.map((c) => {
          const active = c === value;
          return (
            <button
              key={c}
              type="button"
              onClick={() => onChange(c)}
              className={[
                "shrink-0 rounded-full px-2.5 py-1 text-[16px] font-bold transition-colors",
                active
                  ? "bg-custom-blue text-white"
                  : "bg-transparent text-custom-gray opacity-70 hover:opacity-100",
              ].join(" ")}
            >
              {c}
            </button>
          );
        })}
      </div>
    </div>
  );
}

