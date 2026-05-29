"use client";
import { Home } from "lucide-react";
import { useRouter } from "next/navigation";
import React from "react";

export default function HomeButton() {
  const router = useRouter();
  return (
    <button onClick={() => router.replace("/")} className="sticky z-100">
      <Home className="absolute right-4 top-2 h-8 w-8 text-black" />
    </button>
  );
}
