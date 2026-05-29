import WriteButton from "@/components/admin/WriteButton";
import React from "react";
import ListItem from "./_components/ListItem";
import { getEvents } from "@/api/events";

export default async function AdminEventPage() {
  const events = await getEvents({ revalidate: 0 }); // 캐싱 무시하고 항상 최신 데이터 불러오기

  return (
    <div>
      <WriteButton link="/admin/event/write-and-edit" />
      {events.map((event) => (
        <ListItem
          key={event.id}
          id={event.id}
          title={event.title}
          date={new Date(event.createdAt).toLocaleString("ko-KR", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
            hour: "2-digit",
            minute: "2-digit",
          })}
        />
      ))}
    </div>
  );
}
