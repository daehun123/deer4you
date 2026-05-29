"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  LostItemApi,
  updateLostItemStatus,
  deleteLostItem,
} from "@/api/lost-items";
import Image from "next/image";
import DeleteCheckAlert from "@/components/admin/DeleteCheckAlert";

interface LostItemProps {
  item: LostItemApi;
}

export default function LostItem({ item }: LostItemProps) {
  const date = new Date(item.createdAt);
  const formattedDate = `${date.getFullYear()}. ${String(
    date.getMonth() + 1,
  ).padStart(2, "0")}. ${String(date.getDate()).padStart(2, "0")} ${String(
    date.getHours(),
  ).padStart(2, "0")}:${String(date.getMinutes()).padStart(2, "0")}`;
  const [isDeleteAlertVisible, setIsDeleteAlertVisible] = React.useState(false);

  const [currentStatus, setCurrentStatus] = useState(item.status);

  const toggleStatus = async () => {
    if (currentStatus === "DISPOSED") return;

    const newStatus = currentStatus === "STORED" ? "RETURNED" : "STORED";
    const previousStatus = currentStatus;

    setCurrentStatus(newStatus);
    try {
      await updateLostItemStatus(item.id, newStatus);
    } catch (error) {
      console.error(error);
      alert("상태 변경에 실패했습니다.");
      setCurrentStatus(previousStatus); // 롤백
    }
  };

  return (
    <div className="flex gap-4 p-4 border-b border-gray-100 bg-white">
      <div className="flex flex-col gap-2">
        <div className="w-25 h-25 bg-gray-200 relative overflow-hidden">
          {item.imageUrls && item.imageUrls.length > 0 && (
            <Image
              src={item.imageUrls[0]}
              alt={item.itemName}
              className="object-cover w-full h-full"
              width={100}
              height={100}
              priority
            />
          )}
        </div>
        <div className="flex justify-between mt-1">
          <Link
            href={`/admin/lost/write-and-edit/${item.id}`}
            className="flex items-center justify-center w-[48%] py-1.5 bg-gray-100 text-gray-700 text-xs font-semibold rounded"
          >
            수정
          </Link>
          <button
            type="button"
            className="w-[48%] py-1.5 bg-[#E83C31] text-white text-xs font-semibold rounded"
            onClick={() => setIsDeleteAlertVisible(true)}
          >
            삭제
          </button>
        </div>
      </div>

      <div className="flex flex-col flex-1 py-1 relative">
        <h3 className="text-lg font-bold text-gray-900">{item.itemName}</h3>
        <p className="text-sm text-gray-400 mt-1">{formattedDate}</p>

        <p className="text-sm text-gray-400 mt-auto">
          [습득장소] {item.foundLocation}
        </p>

        {/* 상태 변경 버튼 */}
        <div className="absolute top-0 right-0">
          <button
            onClick={toggleStatus}
            disabled={currentStatus === "DISPOSED"}
            className={`px-3 py-1 text-xs font-bold rounded-sm ${
              currentStatus === "STORED"
                ? "bg-blue-500 text-white"
                : currentStatus === "RETURNED"
                  ? "bg-gray-700 text-white"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
            }`}
          >
            {currentStatus === "STORED"
              ? "보관중"
              : currentStatus === "RETURNED"
                ? "반환완료"
                : "폐기됨"}
          </button>
        </div>
      </div>
      {isDeleteAlertVisible && (
        <DeleteCheckAlert
          setVisible={setIsDeleteAlertVisible}
          onCancel={() => setIsDeleteAlertVisible(false)}
          onConfirm={async () => {
            try {
              await deleteLostItem(item.id);
              alert("분실물이 삭제되었습니다.");
              window.location.reload(); // 삭제 후 목록 갱신
            } catch (error) {
              console.error("삭제 중 오류 발생:", error);
              alert("분실물 삭제에 실패했습니다.");
            } finally {
              setIsDeleteAlertVisible(false);
            }
          }}
        />
      )}
    </div>
  );
}
