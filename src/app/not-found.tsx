"use client";
import React from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import BottomNavBar from "@/components/navbar/BottomNavBar";

export default function NotFound() {
  const router = useRouter();
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-lg relative">
      <Header />
      <div className="py-7 px-17 flex flex-col gap-10 items-center justify-center">
        <Image
          src="/error.svg"
          alt="Error"
          width={281}
          height={181}
          priority={true}
          className="m-auto h-auto"
        />
        <div className="flex flex-col gap-3.5">
          <h3 className="font-bold text-[18px]">
            서비스에 접속할 수 없습니다.
          </h3>
          <p className="text-[#BEC6CD] text-[15px] text-center">
            일시적인 장애이거나 <br />
            네트워크 문제일 수 있습니다.
            <br /> 잠시 후 다시 이용해주세요
          </p>
        </div>
        <button
          className="py-1.5 px-3.25 bg-custom-blue rounded-[10px] text-[20px] font-semibold text-white"
          onClick={() => router.replace("/")}
        >
          돌아가기
        </button>
      </div>
      <BottomNavBar />
    </div>
  );
}
