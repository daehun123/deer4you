"use client";

import React from "react";
import SearchBar from "./SearchBar";
import Filter, { BOOTH_FILTERS, type BoothFilter } from "./Filter";
import BoothList from "./BoothList";
import { dummyBooths } from "../_data/boothData";
import { Loader2 } from "lucide-react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function parseFilter(value: string | null): BoothFilter {
  if (value && BOOTH_FILTERS.includes(value as BoothFilter)) {
    return value as BoothFilter;
  }
  return "전체";
}

export default function BoothsPageContent() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const activeFilter = parseFilter(searchParams.get("filter"));
  const searchKeywordFromUrl = searchParams.get("q") ?? "";
  const [inputValue, setInputValue] = React.useState(searchKeywordFromUrl);

  React.useEffect(() => {
    setTimeout(() => {
      setInputValue(searchKeywordFromUrl);
    }, 0);
  }, [searchKeywordFromUrl]);

  React.useEffect(() => {
    const timer = window.setTimeout(() => {
      if (inputValue !== searchKeywordFromUrl) {
        const params = new URLSearchParams(searchParams.toString());
        const trimmed = inputValue.trim();
        if (trimmed === "") params.delete("q");
        else params.set("q", trimmed);

        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
    }, 300);

    return () => window.clearTimeout(timer);
  }, [inputValue, searchKeywordFromUrl, pathname, router, searchParams]);

  const updateQuery = React.useCallback(
    (next: { filter?: BoothFilter; q?: string }) => {
      const params = new URLSearchParams(searchParams.toString());

      if (next.filter !== undefined) {
        if (next.filter === "전체") params.delete("filter");
        else params.set("filter", next.filter);
      }

      if (next.q !== undefined) {
        const trimmed = next.q.trim();
        if (trimmed === "") params.delete("q");
        else params.set("q", trimmed);
      }

      const qs = params.toString();
      router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  const filteredBooths = React.useMemo(() => {
    const keyword = inputValue.trim();
    return dummyBooths.filter((booth) => {
      const matchesKeyword =
        keyword === "" ||
        booth.name.includes(keyword) ||
        booth.host.includes(keyword) ||
        booth.location.includes(keyword) ||
        booth.name.includes(keyword.toUpperCase()) ||
        booth.host.includes(keyword.toUpperCase()) ||
        booth.location.includes(keyword.toUpperCase()) ||
        booth.name.includes(keyword.toLowerCase()) ||
        booth.host.includes(keyword.toLowerCase()) ||
        booth.location.includes(keyword.toLowerCase());
      const matchesFilter =
        activeFilter === "전체" || booth.category === activeFilter;
      return matchesKeyword && matchesFilter;
    });
  }, [inputValue, activeFilter]);

  const handleSearchSubmit = (keyword: string) => {
    updateQuery({ q: keyword });
    if (keyword.trim() === "관리자") {
      router.push("/admin/login");
    }
  };

  return (
    <div className="px-8 overflow-y-auto flex-1 h-full pb-24">
      <SearchBar
        value={inputValue}
        onChange={setInputValue}
        onSubmit={handleSearchSubmit}
      />
      <Filter
        onFilterChange={(filter) =>
          updateQuery({ filter: filter as BoothFilter })
        }
        activeFilter={activeFilter}
      />
      {dummyBooths.length === 0 ? (
        <div className="flex items-center justify-center h-full mt-10">
          <Loader2 className="h-8 w-8 animate-spin text-custom-blue" />
        </div>
      ) : (
        <BoothList booths={filteredBooths} />
      )}
    </div>
  );
}
