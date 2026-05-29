import Link from "next/link";
import React from "react";

export default function SectionLayout({
  title,
  link,
  children,
}: {
  title: string;
  link: string;
  children: React.ReactNode;
}) {
  return (
    <div className="p-6.5 gap-4 flex flex-col">
      <div className="flex items-center justify-between">
        <h4 className="font-bold text-[21px]">{title}</h4>
        <Link href={link} className="text-custom-gray text-[12px]">
          전체보기
        </Link>
      </div>
      <div className="flex overflow-x-auto gap-4.5 scrollbar-hide snap-x">
        {children}
      </div>
    </div>
  );
}
