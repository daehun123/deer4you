"use client";
import React, { useEffect, useState } from "react";
import NoticeItem from "./NoticeItem";
import { Loader2 } from "lucide-react";
import { getNotices, Notice } from "@/api/notice";

export default function NoticeBody() {
  const [notices, setNotices] = useState<Notice[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchNotices = async () => {
      setLoading(true);
      const { ok, data } = await getNotices();

      if (ok && data) {
        if (process.env.NODE_ENV === "development") {
          console.log("공지사항 목록:", data);
        }
        setNotices(data);
      } else {
        console.error("공지사항 목록을 불러오지 못했습니다.");
      }
      setLoading(false);
    };

    fetchNotices();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 flex items-center justify-center min-h-50">
        <Loader2 className="h-8 w-8 animate-spin text-custom-blue" />
      </div>
    );
  }

  if (notices.length === 0) {
    return (
      <div className="flex-1 flex items-center justify-center text-gray-500">
        등록된 공지사항이 없습니다.
      </div>
    );
  }

  return (
    <div className="relative flex-1">
      {notices.map((notice) => (
        <NoticeItem key={notice.id} notice={notice} />
      ))}
    </div>
  );
}
