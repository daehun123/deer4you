"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState, useEffect } from "react";

export default function NoticeModal() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  useEffect(() => {
    const timer = setTimeout(() => {
      const hideDate = localStorage.getItem("hide-notice");
      const today = new Date().toLocaleDateString();

      if (hideDate !== today) {
        setIsOpen(true);
      }
    }, 0);

    return () => clearTimeout(timer);
  }, []);

  const handleClose = () => setIsOpen(false);

  const handleHideToday = () => {
    localStorage.setItem("hide-notice", new Date().toLocaleDateString());
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-100 flex flex-col items-center justify-center bg-black/70 h-screen w-full">
      <div className="w-7/8 max-w-sm flex flex-col items-center">
        <Image
          src="/poster.webp"
          alt="Notice Poster"
          width={400}
          height={300}
          priority
          className="w-auto h-auto"
          onClick={() => router.push("/about")}
        />
        <div className="mt-4 flex justify-between w-full text-white text-[12px] font-bold">
          <button onClick={handleHideToday}>오늘 하루 열지 않기</button>
          <button onClick={handleClose}>닫기</button>
        </div>
      </div>
    </div>
  );
}
