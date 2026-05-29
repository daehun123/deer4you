"use client";
import React, { useEffect, useState } from "react";
import ListItem from "./_components/ListItem";
import { Loader2 } from "lucide-react";
import { useRouter } from "next/navigation";
import WriteButton from "../../../../components/admin/WriteButton";
import DeleteCheckAlert from "@/components/admin/DeleteCheckAlert";
import {
  Notice,
  deleteNotice,
  getNotices,
  toggleNoticePin,
} from "@/api/notice";

export default function AdminNoticePage() {
  const [noticeList, setNoticeList] = useState<Notice[]>([]);
  const [invalid, setInvalid] = useState(false);
  const [loading, setLoading] = useState(true);
  const router = useRouter();
  const [visible, setVisible] = useState(false);
  const [targetId, setTargetId] = useState<number | null>(null);

  useEffect(() => {
    getNotices()
      .then(({ data }) => {
        if (data) {
          setNoticeList(data);
        }
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <div>
      {loading ? (
        <div className="flex items-center justify-center h-64 text-blue-300">
          <Loader2 className="animate-spin" size={40} />
        </div>
      ) : noticeList.length === 0 ? (
        <div className="flex items-center justify-center h-64 text-gray-500">
          등록된 공지사항이 없습니다.
        </div>
      ) : (
        noticeList.map((notice) => (
          <ListItem
            key={notice.id}
            id={notice.id}
            title={notice.title}
            content={notice.content}
            createdAt={new Date(notice.createdAt).toLocaleString("ko-KR", {
              year: "numeric",
              month: "2-digit",
              day: "2-digit",
              hour: "2-digit",
              minute: "2-digit",
            })}
            pinned={notice.pinned}
            setPinned={async (pinned) => {
              if (invalid) return;
              setInvalid(true);

              const success = await toggleNoticePin(notice.id);

              if (success) {
                setNoticeList((prev) => {
                  const updated = prev.map((n) =>
                    n.id === notice.id ? { ...n, pinned } : n,
                  );
                  return [...updated].sort((a, b) => {
                    if (a.pinned && !b.pinned) return -1;
                    if (!a.pinned && b.pinned) return 1;
                    return (
                      new Date(b.createdAt).getTime() -
                      new Date(a.createdAt).getTime()
                    );
                  });
                });
              } else {
                alert("고정 상태 변경에 실패했습니다.");
              }

              setTimeout(() => setInvalid(false), 500);
            }}
            onEdit={() => {
              router.push(`/admin/notice/write-and-edit/${notice.id}`);
            }}
            onDelete={() => {
              setTargetId(notice.id);
              setVisible(true);
            }}
          />
        ))
      )}
      <WriteButton link="/admin/notice/write-and-edit" />
      {visible && targetId !== null && (
        <DeleteCheckAlert
          setVisible={setVisible}
          onCancel={() => setVisible(false)}
          onConfirm={async () => {
            if (targetId !== null) {
              const success = await deleteNotice(targetId);
              if (success) {
                setNoticeList((prev) => prev.filter((n) => n.id !== targetId));
              } else {
                alert("공지사항 삭제에 실패했습니다.");
              }
            }
            setTargetId(null);
            setVisible(false);
          }}
        />
      )}
    </div>
  );
}
