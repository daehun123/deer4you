import Header from "@/components/Header";
import { Home } from "lucide-react";
import React from "react";
import HomeButton from "./_components/HomeButton";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-lg relative">
      <Header />
      <HomeButton />
      <div
        id="subHeader"
        className="h-12 bg-[#FFEE00] flex items-center justify-center text-black font-semibold"
      >
        관리자 대시보드
      </div>
      <main className="flex-1 overflow-y-auto">{children}</main>
    </div>
  );
}
