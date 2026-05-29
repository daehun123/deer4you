"use client";

import React, { useMemo, useState } from "react";
import { type EventItem } from "../_data/eventData";
import EventListItem from "./EventListItem";
import EventSearchInput from "./EventSearchInput";

type Props = {
  items: EventItem[];
};

export default function EventListView({ items }: Props) {
  const [query, setQuery] = useState("");

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return items;
    return items.filter((e) => e.title.toLowerCase().includes(q));
  }, [items, query]);

  return (
    <div className="px-6.25 pb-6.25">
      <EventSearchInput value={query} onChange={setQuery} />

      <div className="mt-6.25 flex flex-col gap-5">
        {filtered.map((item, idx) => (
          <EventListItem key={item.id} item={item} priority={idx === 0} />
        ))}
      </div>
    </div>
  );
}
