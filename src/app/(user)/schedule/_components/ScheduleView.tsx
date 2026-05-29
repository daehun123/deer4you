"use client";

import React, { useMemo, useState } from "react";
import {
  lineupItems,
  scheduleDays,
  scheduleItems,
  type ScheduleItem,
} from "../_data/scheduleData";
import DateTabs from "./DateTabs";
import LineupSection from "./LineupSection";
import TimetableSection from "./TimetableSection";

function compareTime(a: ScheduleItem, b: ScheduleItem) {
  if (a.start !== b.start) return a.start.localeCompare(b.start);
  return a.title.localeCompare(b.title);
}

export default function ScheduleView() {
  const [selectedDate, setSelectedDate] = useState<string>(
    scheduleDays[0]?.date ?? "",
  );

  const timetableForDay = useMemo(() => {
    return scheduleItems
      .filter((it) => it.date === selectedDate)
      .slice()
      .sort(compareTime);
  }, [selectedDate]);

  const lineupForDay = useMemo(() => {
    return lineupItems.filter((it) => it.date === selectedDate);
  }, [selectedDate]);

  return (
    <div className="p-6.25">
      <section className="pb-6.25">
        <h2 className="text-[21px] font-bold text-black">일정</h2>
        <DateTabs
          days={scheduleDays}
          selectedDate={selectedDate}
          onSelect={setSelectedDate}
        />
      </section>

      <LineupSection items={lineupForDay} />

      <TimetableSection key={selectedDate} items={timetableForDay} />
    </div>
  );
}
