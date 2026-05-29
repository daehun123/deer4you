"use client";
import { deleteEvent } from "@/api/events";
import DeleteCheckAlert from "@/components/admin/DeleteCheckAlert";
import { useRouter } from "next/navigation";
import React from "react";

interface ListItemProps {
  id: number;
  title: string;
  date: string;
}

export default function ListItem({ id, title, date }: ListItemProps) {
  const router = useRouter();
  const [visible, setVisible] = React.useState(false);

  const handleDelete = async () => {
    try {
      await deleteEvent(id.toString());
      alert("이벤트가 삭제되었습니다.");
      setVisible(false);
      router.refresh();
    } catch (error) {
      console.error("이벤트 삭제 에러:", error);
      alert("삭제 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="p-6 mb-4 flex flex-col gap-2 border-b">
      <h3 className="font-semibold text-xl">{title}</h3>
      <p className="text-sm">{date}</p>
      <div className="flex gap-2">
        <button
          onClick={() => router.push(`/admin/event/write-and-edit/${id}`)}
          className="bg-custom-lightgray px-2 py-1 rounded-md"
        >
          수정
        </button>
        <button
          onClick={() => setVisible(true)}
          className="bg-red-400 text-white px-2 py-1 rounded-md"
        >
          삭제
        </button>
      </div>
      {visible && (
        <DeleteCheckAlert
          setVisible={setVisible}
          onCancel={() => setVisible(false)}
          onConfirm={handleDelete}
        />
      )}
    </div>
  );
}
