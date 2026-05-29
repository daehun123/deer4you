import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function GoodsBanner() {
  return (
    <Link
      href="/goods"
      aria-label="굿즈 페이지로 이동"
      className="block w-full h-auto"
    >
      <Image
        src="/home/goods/goods_banner.webp"
        alt="Goods Banner"
        width={1200}
        height={400}
      />
    </Link>
  );
}
