"use client";
import React from "react";
import FilterItem from "./FilterItem";

const defaultFilters = [
  "전체",
  "학과",
  "동아리",
  "외부업체",
  "푸드트럭",
  "총학부스",
];

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
  const list = filters ?? defaultFilters;
  return (
    <div className="flex overflow-x-auto gap-3 scrollbar-hide snap-x">
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
