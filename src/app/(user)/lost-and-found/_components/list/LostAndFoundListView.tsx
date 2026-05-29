"use client";

import React, { useEffect, useMemo, useState } from "react";
import {
  type LostItemCategory,
  type LostItem,
  fetchLostItemsByQuery,
} from "../../_data/lostAndFoundData";
import LostAndFoundCategoryTabs from "./LostAndFoundCategoryTabs";
import LostAndFoundEmptyResult from "./LostAndFoundEmptyResult";
import LostAndFoundListItem from "./LostAndFoundListItem";
import LostAndFoundSearchInput from "./LostAndFoundSearchInput";

type Props = {
  items: LostItem[];
};

export default function LostAndFoundListView({ items }: Props) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<LostItemCategory>("전체");
  const [remoteItems, setRemoteItems] = useState<LostItem[]>(items);
  const [loading, setLoading] = useState(false);

  const debouncedQuery = useDebouncedValue(query, 250);

  useEffect(() => {
    let cancelled = false;
    const run = async () => {
      setLoading(true);
      try {
        const next = await fetchLostItemsByQuery({
          search: debouncedQuery.trim() ? debouncedQuery.trim() : undefined,
          category,
        });
        if (!cancelled) setRemoteItems(next);
      } finally {
        if (!cancelled) setLoading(false);
      }
    };
    void run();
    return () => {
      cancelled = true;
    };
  }, [debouncedQuery, category]);

  const filtered = useMemo(() => remoteItems, [remoteItems]);

  return (
    <div className="px-6.25 pb-6.25">
      <LostAndFoundSearchInput value={query} onChange={setQuery} />
      <LostAndFoundCategoryTabs value={category} onChange={setCategory} />

      <div className="mt-6.25">
        {loading ? (
          <div className="text-[12px] font-semibold text-custom-darkgray">
            불러오는 중...
          </div>
        ) : filtered.length === 0 ? (
          <LostAndFoundEmptyResult />
        ) : (
          <div className="flex flex-col gap-5">
            {filtered.map((item) => (
              <LostAndFoundListItem key={item.id} item={item} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

function useDebouncedValue<T>(value: T, delayMs: number) {
  const [debounced, setDebounced] = useState(value);
  useEffect(() => {
    const t = setTimeout(() => setDebounced(value), delayMs);
    return () => clearTimeout(t);
  }, [value, delayMs]);
  return debounced;
}

