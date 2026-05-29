"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { adminFetch } from "@/api/admin/client";

interface FormLayoutProps {
  initialTitle?: string;
  initialContent?: string;
  initialIsSticked?: boolean;
  noticeId?: number;
}
export default function FormLayout({
  initialTitle = "",
  initialContent = "",
  initialIsSticked = false,
  noticeId,
}: FormLayoutProps) {
  const [content, setContent] = useState(initialContent);
  const [title, setTitle] = useState(initialTitle);
  const [isSticked, setIsSticked] = useState(initialIsSticked);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isSubmitting) return;

    if (!title.trim() || !content.trim()) {
      alert("제목과 내용을 모두 입력해주세요.");
      return;
    }

    try {
      setIsSubmitting(true);
      const payload = {
        title: title.trim(),
        content: content.trim(),
        pinned: isSticked,
      };

      if (noticeId) {
        await adminFetch(`/admin/notices/${noticeId}`, {
          method: "PATCH",
          body: JSON.stringify(payload),
        }).then((res) => {
          if (!res.ok) {
            console.error("공지사항 수정 실패", res);
            throw new Error("공지사항 수정 실패");
          }
        });

        alert("공지사항이 성공적으로 수정되었습니다.");
      } else {
        await adminFetch("/admin/notices", {
          method: "POST",
          body: JSON.stringify(payload),
        }).then((res) => {
          if (!res.ok) {
            console.error("공지사항 등록 실패", res);

            throw new Error("공지사항 등록 실패");
          }
        });

        alert("공지사항이 성공적으로 등록되었습니다.");
      }

      router.replace("/admin/notice");
    } catch (error) {
      console.error(error);
      alert("저장 중 오류가 발생했습니다. 다시 시도해주세요.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col h-full bg-white p-4">
      <input
        type="text"
        placeholder="제목을 입력하세요"
        className="bg-gray-100 p-3 mb-4 rounded-md"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <div className="flex items-center gap-2 mb-4">
        <span>상단 고정</span>
        <input
          type="checkbox"
          checked={isSticked}
          onChange={(e) => setIsSticked(e.target.checked)}
        />
      </div>

      <div className="flex-1 pb-20">
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          placeholder="내용을 입력하세요"
          className="w-full h-64 p-3 bg-gray-100 rounded-md resize-none outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex justify-end gap-2 mt-10">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 rounded-md"
          onClick={() => router.back()}
          disabled={isSubmitting}
        >
          취소
        </button>
        <button
          type="submit"
          className="px-4 py-2 bg-blue-500 text-white rounded-md disabled:bg-blue-300 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? "저장 중..." : "저장"}
        </button>
      </div>
    </form>
  );
}
