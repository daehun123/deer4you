import React from "react";

interface SoldOutStateProps {
  isSoldOut: boolean;
}

export default function SoldOutState({ isSoldOut }: SoldOutStateProps) {
  return (
    <>
      {isSoldOut ? (
        <p className="text-white bg-red-500 px-2.5 py-1 rounded-md w-fit text-[11px] font-semibold">
          품절
        </p>
      ) : (
        <p className="text-white bg-[#0B89FF] px-2.5 py-1 rounded-md w-fit text-[11px] font-semibold">
          판매중
        </p>
      )}
    </>
  );
}
