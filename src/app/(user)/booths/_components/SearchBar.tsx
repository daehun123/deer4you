"use client";

import React from "react";

interface SearchBarProps {
  onSearch: (keyword: string) => void;
  onSubmit: (keyword: string) => void;
}

export default function SearchBar({ onSearch, onSubmit }: SearchBarProps) {
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);
    const keyword = formData.get("search") as string;

    onSubmit(keyword);
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="search"
        name="search"
        placeholder="검색어를 입력하세요..."
        onChange={(e) => onSearch(e.target.value)}
        className="w-full px-4 py-2 bg-custom-lightgray rounded-xl mb-4"
      />
    </form>
  );
}
