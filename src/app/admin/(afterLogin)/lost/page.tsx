"use client";
import React, { useEffect, useState } from "react";
import LostItem from "./_components/LostItem";
import WriteButton from "@/components/admin/WriteButton";
import { Loader2 } from "lucide-react";
import { getLostItems, LostItemApi } from "@/api/lost-items";

export default function AdminLostPage() {
  const [lostItems, setLostItems] = useState<LostItemApi[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLostItems = async () => {
      try {
        const data = await getLostItems();
        console.log("조회된 분실물 데이터:", data);
        setLostItems(data);
      } catch (error) {
        console.error("분실물 조회 실패:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchLostItems();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-blue-300">
        <Loader2 className="animate-spin" size={40} />
      </div>
    );
  }

  return (
    <div className="flex flex-col relative pb-24">
      {lostItems.map((item) => (
        <LostItem key={item.id} item={item} />
      ))}
      <WriteButton link="/admin/lost/write-and-edit" />
    </div>
  );
}
