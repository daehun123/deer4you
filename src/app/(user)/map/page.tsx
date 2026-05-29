"use client";

import React, {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import Filter from "../booths/_components/Filter";
import BottomSheet from "./_components/BottomSheet";
import NaverMap from "./_components/NaverMap";
import {
  boothMapPoints,
  type BoothMapPoint,
  type MapCategory,
} from "./_data/boothMapPoints";
import {
  experienceList,
  externalCompanyList,
  foodTruckList,
  schoolBoothList,
} from "@/data/festival";
import {
  EXTERNAL_BOOTH_ID_OFFSET,
  SCHOOL_BOOTH_ID_OFFSET,
} from "../booths/_data/boothData";
import Image from "next/image";
import Link from "next/link";

export default function MapPage() {
  const [active, setActive] = useState<MapCategory>("전체");
  const [sheetMode, setSheetMode] = useState<"부스" | "푸드트럭" | null>(null);
  const filterWrapRef = useRef<HTMLDivElement | null>(null);
  const [sheetTopLimit, setSheetTopLimit] = useState(0);
  const [bottomNavHeight, setBottomNavHeight] = useState(100);
  const filters: MapCategory[] = [
    "전체",
    "화장실",
    "푸드트럭",
    "부스",
    "의무실",
    "흡연구역",
    "금연구역",
    "무대",
    "운영본부",
  ];

  const points = useMemo(() => {
    if (active === "전체") return boothMapPoints;
    return boothMapPoints.filter((p) => p.category === active);
  }, [active]);

  const mapZoom = active === "전체" ? 18 : 17;

  const experienceSheetItems = useMemo(
    () => [
      ...experienceList.map((item) => ({
        item,
        href: `/booths/${item.id}`,
      })),
      ...externalCompanyList.map((item) => ({
        item,
        href: `/booths/${item.id + EXTERNAL_BOOTH_ID_OFFSET}`,
      })),
      ...schoolBoothList.map((item) => ({
        item,
        href: `/booths/${item.id + SCHOOL_BOOTH_ID_OFFSET}`,
      })),
    ],
    [],
  );

  const handlePointClick = useCallback((p: BoothMapPoint) => {
    if (p.category === "부스") setSheetMode("부스");
    if (p.category === "푸드트럭") setSheetMode("푸드트럭");
  }, []);

  useEffect(() => {
    const el = filterWrapRef.current;
    if (!el) return;

    const update = () => {
      const rect = el.getBoundingClientRect();
      setSheetTopLimit(Math.max(0, Math.round(rect.top - 8)));
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(el);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  useEffect(() => {
    const nav = document.querySelector<HTMLElement>("nav.fixed.bottom-0");
    if (!nav) return;

    const update = () => {
      const rect = nav.getBoundingClientRect();
      setBottomNavHeight(Math.max(0, Math.round(rect.height)));
    };

    update();
    const ro = new ResizeObserver(() => update());
    ro.observe(nav);
    window.addEventListener("resize", update);
    return () => {
      ro.disconnect();
      window.removeEventListener("resize", update);
    };
  }, []);

  return (
    <div className="pb-18">
      <div className="mt-4">
        <div className="px-6.25" ref={filterWrapRef}>
          <Filter
            activeFilter={active}
            filters={filters}
            onFilterChange={(f) => {
              setActive(f as MapCategory);
              setSheetMode(null);
            }}
          />
        </div>
      </div>

      <div className="mt-4">
        <div className="px-6.25">
          <NaverMap
            points={points}
            onPointClick={handlePointClick}
            initialZoom={mapZoom}
          />
        </div>
      </div>

      {sheetMode && (
        <BottomSheet
          open
          title={sheetMode === "부스" ? "부스 목록" : "푸드트럭 목록"}
          onClose={() => setSheetMode(null)}
          initialSnap="mid"
          bottomInsetPx={bottomNavHeight + 24}
          topLimitPx={sheetTopLimit}
        >
          <div className="space-y-3">
            {(sheetMode === "부스"
              ? experienceSheetItems
              : foodTruckList.map((item) => ({
                  item,
                  href: `/booths/foodtrucks/${item.id}`,
                }))
            ).map(({ item, href }) => {
                return (
                  <Link
                    key={href}
                    href={href}
                    className="flex gap-3 rounded-xl border border-black/5 bg-white p-3 active:bg-black/2"
                  >
                    <div className="relative h-16 w-16 shrink-0 overflow-hidden rounded-lg bg-black/5">
                      <Image
                        src={item.imageUrl}
                        alt={item.name}
                        fill
                        className="object-cover"
                        sizes="64px"
                      />
                    </div>
                    <div className="min-w-0 flex flex-col gap-0.5">
                      <div className="truncate text-lg font-bold leading-snug text-black">
                        {item.name}
                      </div>
                      <div className="line-clamp-2 text-[13px] leading-snug text-custom-gray/85">
                        {item.description}
                      </div>
                    </div>
                  </Link>
                );
              },
            )}
          </div>
        </BottomSheet>
      )}
    </div>
  );
}
