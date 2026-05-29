"use client";

import React, { useState } from "react";
import { type ScheduleItem } from "../_data/scheduleData";

function formatTimeRange(item: ScheduleItem) {
  return item.end ? `${item.start} ~ ${item.end}` : item.start;
}

function formatDetailTimeRange(
  item: NonNullable<ScheduleItem["details"]>[number],
) {
  return item.end ? `${item.start} ~ ${item.end}` : item.start;
}

const expandableTitles = new Set([
  "동아리 리허설",
  "동아리 공연",
  "동아리공연",
  "총학생회 이벤트",
  "연예인 초청 공연",
  "연예인 초청공연",
]);

type Props = {
  items: ScheduleItem[];
};

export default function TimetableSection({ items }: Props) {
  const [expandedTitles, setExpandedTitles] = useState<Set<string>>(new Set());

  const toggleExpanded = (title: string) => {
    setExpandedTitles((prev) => {
      const next = new Set(prev);
      if (next.has(title)) {
        next.delete(title);
      } else {
        next.add(title);
      }
      return next;
    });
  };

  const handleToggleKeyDown = (
    event: React.KeyboardEvent<HTMLDivElement>,
    title: string,
  ) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    toggleExpanded(title);
  };

  return (
    <section className="-mx-6.25 px-6.25">
      <div className="flex items-end justify-between pb-[13px]">
        <h3 className="text-[21px] font-bold text-black">타임테이블</h3>
      </div>

      {items.length === 0 ? (
        <div className="mt-3 text-[12px] font-semibold text-custom-darkgray">
          선택한 날짜에 등록된 일정이 없어요.
        </div>
      ) : (
        <div className="-mx-6.25 flex flex-col">
          {items.map((item, index) => {
            const canExpand =
              expandableTitles.has(item.title) && Boolean(item.details?.length);
            const isExpanded = expandedTitles.has(item.title);

            return (
              <article key={item.id} className="border-b border-[#E8EBED]">
                <div
                  className={`px-6.25 ${index === 0 ? "pt-0" : "pt-[13px]"} ${
                    canExpand && isExpanded ? "" : "pb-[13px]"
                  }`}
                >
                  <div
                    role={canExpand ? "button" : undefined}
                    tabIndex={canExpand ? 0 : undefined}
                    onClick={
                      canExpand ? () => toggleExpanded(item.title) : undefined
                    }
                    onKeyDown={
                      canExpand
                        ? (event) => handleToggleKeyDown(event, item.title)
                        : undefined
                    }
                    className={canExpand ? "cursor-pointer" : undefined}
                  >
                    <div className="flex flex-col gap-[13px]">
                      <span className="inline-flex w-fit border border-[#D2D9DF] bg-white px-[4px] py-[2px] text-[13px] font-semibold text-[#464B50]">
                        {formatTimeRange(item)}
                      </span>
                      <div className="flex items-end justify-between gap-4">
                        <div className="flex min-w-0 flex-col gap-1">
                          <div className="text-[14px] font-bold leading-snug text-black">
                            {item.title}
                          </div>
                          {item.description && (
                            <div className="text-[12px] font-normal leading-snug text-[#A6AFB7]">
                              {item.description}
                            </div>
                          )}
                        </div>
                        {canExpand && (
                          <span className="shrink-0 text-[12px] font-normal text-[#A6AFB7]">
                            {isExpanded ? "간략히보기" : "전체보기"}
                          </span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
                {canExpand && isExpanded && (
                  <div className="mt-[13px] flex flex-col bg-custom-lightgray px-6.25 py-[26px]">
                    {item.details?.map((detail, detailIndex) => (
                      <div
                        key={detail.id}
                        className={`flex flex-col gap-[13px] ${
                          detailIndex > 0 ? "mt-[26px]" : ""
                        }`}
                      >
                        <span className="inline-flex w-fit border border-[#D2D9DF] bg-white px-[4px] py-[2px] text-[13px] font-semibold text-[#464B50]">
                          {formatDetailTimeRange(detail)}
                        </span>
                        <div className="flex flex-col gap-1">
                          <div className="text-[15px] font-bold leading-snug text-black">
                            {detail.title}
                          </div>
                          {detail.description && (
                            <div className="text-[12px] font-normal leading-snug text-[#A6AFB7]">
                              {detail.description}
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </article>
            );
          })}
        </div>
      )}
    </section>
  );
}
