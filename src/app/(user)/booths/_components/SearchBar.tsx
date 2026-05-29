"use client";

import React from "react";

interface SearchBarProps {
  value: string;
  onChange: (keyword: string) => void;
  onSubmit: (keyword: string) => void;
}

export default function SearchBar({ value, onChange, onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(value);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        value={value}
        placeholder="검색어를 입력하세요..."
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-2 bg-custom-lightgray rounded-xl mb-4"
      />
    </form>
  );
}
