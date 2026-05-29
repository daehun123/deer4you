import React from "react";

interface FilterItemProps {
  label: string;
  isActive: boolean;
  onClick: () => void;
}

export default function FilterItem({
  label,
  isActive,
  onClick,
}: FilterItemProps) {
  return (
    <div
      className={`px-4 py-2 shrink-0 whitespace-nowrap rounded-4xl cursor-pointer text-[16px] font-semibold ${
        isActive
          ? "bg-custom-blue text-white font-semibold"
          : "bg-transparent text-custom-darkgray font-semibold"
      }`}
      onClick={onClick}
    >
      {label}
    </div>
  );
}
