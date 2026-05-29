"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import GoodsDetailBoard from "./GoodsDetailBoard";
import { Loader2 } from "lucide-react";
import { GoodsDetail, getGoodsById } from "@/api/goods";

export default function GoodsDetailBody({ goodsId }: { goodsId: string }) {
  const [goodsDetail, setGoodsDetail] = useState<GoodsDetail | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchGoodsDetail = async () => {
      if (!goodsId) return;
      setIsLoading(true);

      try {
        const { status, ok, data } = await getGoodsById(parseInt(goodsId));
        if (ok && data) {
          if (process.env.NODE_ENV === "development") {
            console.log("상품 상세 정보:", data);
          }
          setGoodsDetail(data);
        }
        if (status === 404) {
          setGoodsDetail(null);
          if (process.env.NODE_ENV === "development") {
            console.warn(
              `상품 ID ${goodsId}에 대한 상세 정보를 찾을 수 없습니다.`,
            );
          }
        }
      } catch (error) {
        console.error("데이터를 가져오는데 실패했습니다.", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchGoodsDetail();
  }, [goodsId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center flex-1">
        <Loader2 className="h-8 w-8 animate-spin text-custom-blue" />
      </div>
    );
  if (!goodsDetail)
    return (
      <div className="flex items-center justify-center flex-1">
        상품을 찾을 수 없습니다.
      </div>
    );

  const mainImageUrl =
    goodsDetail.imageUrls?.length > 1
      ? goodsDetail.imageUrls[1]
      : goodsDetail.imageUrls?.[0] || null;

  return (
    <div className="flex w-full flex-col gap-10">
      {mainImageUrl ? (
        <div className="mt-4 w-full bg-gray-100">
          <Image
            src={mainImageUrl}
            alt={goodsDetail.name}
            width={1024}
            height={425}
            sizes="(max-width: 448px) 100vw, 448px"
            priority
            className="h-auto w-full object-contain"
          />
        </div>
      ) : (
        <div className="mt-4 w-full bg-gray-200" />
      )}
      <GoodsDetailBoard goods={goodsDetail} />
    </div>
  );
}
