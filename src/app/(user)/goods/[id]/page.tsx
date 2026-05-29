import React from "react";
import GoodsDetailBody from "./_components/GoodsDetailBody";

export default async function GoodsDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const Params = await params;
  return (
    <>
      <GoodsDetailBody goodsId={Params.id} />
    </>
  );
}
