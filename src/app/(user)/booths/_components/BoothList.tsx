import React from "react";
import { BoothData } from "../_data/boothData";
import BoothItem from "./BoothItem";

interface BoothListProps {
  booths: BoothData[];
}

export default function BoothList({ booths }: BoothListProps) {
  if (booths.length === 0) {
    return (
      <div className="text-center text-custom-darkgray mt-10">
        검색 결과가 없습니다.
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4 mt-6">
      {booths.map((booth) => (
        <BoothItem key={booth.id} booth={booth} />
      ))}
    </div>
  );
}
