"use client";
import React from "react";
import FilterItem from "./FilterItem";

export const BOOTH_FILTERS = [
  "전체",
  "학과",
  "동아리",
  "외부업체",
  "푸드트럭",
  "총학부스",
] as const;

export type BoothFilter = (typeof BOOTH_FILTERS)[number];

interface FilterProps {
  onFilterChange: (filter: string) => void;
  activeFilter: string;
  filters?: string[];
}

export default function Filter({
  onFilterChange,
  activeFilter,
  filters,
}: FilterProps) {
  const list = filters ?? [...BOOTH_FILTERS];
  return (
    <div className="flex overflow-x-auto gap-2 scrollbar-hide snap-x">
      {list.map((filter) => (
        <FilterItem
          key={filter}
          label={filter}
          isActive={filter === activeFilter}
          onClick={() => onFilterChange(filter)}
        />
      ))}
    </div>
  );
}
