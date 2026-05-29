import React from "react";
interface RouteButtonProps {
  label: string;
  onClick: () => void;
}
export default function RouteButton({ label, onClick }: RouteButtonProps) {
  return (
    <div
      className="bg-custom-lightgray border-b p-2 px-8 font-bold cursor-pointer h-16 flex items-center hover:bg-gray-200 transition-colors"
      onClick={onClick}
    >
      {label}
    </div>
  );
}
