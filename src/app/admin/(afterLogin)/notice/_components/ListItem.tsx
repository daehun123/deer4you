import { Notice } from "@/api/notice";
import React from "react";
interface ListItemProps extends Notice {
  setPinned?: (pinned: boolean) => void;
  onEdit?: () => void;
  onDelete?: () => void;
}
export default function ListItem({
  title,
  createdAt,
  pinned,
  setPinned,
  onEdit,
  onDelete,
}: ListItemProps) {
  return (
    <div className="p-7 flex-col flex gap-2">
      {pinned && (
        <div className="text-sm bg-[#FFBB00] rounded-lg py-2 px-2.5 w-fit font-semibold">
          상단고정
        </div>
      )}
      <div className="text-lg font-bold">{title}</div>
      <div className="text-sm text-gray-500">{createdAt}</div>
      <div>
        <button
          onClick={onEdit}
          className="text-sm font-semibold bg-custom-lightgray rounded-sm px-2.5 py-1  hover:bg-gray-200 transition-colors"
        >
          수정
        </button>
        {pinned == true ? (
          <button
            className="text-sm font-semibold bg-red-500 text-white rounded-sm px-2.5 py-1 ml-4 hover:bg-red-600 transition-colors"
            onClick={() => setPinned && setPinned(false)}
          >
            고정 해제
          </button>
        ) : (
          <button
            className="text-sm font-semibold bg-green-500 text-white rounded-sm px-2.5 py-1 ml-4 hover:bg-green-600 transition-colors"
            onClick={() => setPinned && setPinned(true)}
          >
            고정
          </button>
        )}
        <button
          onClick={onDelete}
          className="text-sm font-semibold bg-red-500 text-white rounded-sm px-2.5 py-1 ml-4 hover:bg-red-600 transition-colors"
        >
          삭제
        </button>
      </div>
    </div>
  );
}
