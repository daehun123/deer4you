"use client";
import React from "react";
import RouteButton from "./_components/RouteButton";
import { useRouter } from "next/navigation";

export default function AdminPage() {
  const router = useRouter();
  return (
    <div>
      <RouteButton
        label="공지 관리"
        onClick={() => {
          router.push("/admin/notice");
        }}
      />
      <RouteButton
        label="이벤트 관리"
        onClick={() => {
          router.push("/admin/event");
        }}
      />
      <RouteButton
        label="분실물 관리"
        onClick={() => {
          router.push("/admin/lost");
        }}
      />
      <RouteButton
        label="굿즈 관리"
        onClick={() => {
          router.push("/admin/goods");
        }}
      />
    </div>
  );
}
