import Image from "next/image";
import type { FestivalListItem } from "@/data/festival/types";
import MiniMap from "../[id]/_components/MiniMap";

type Props = {
  item: FestivalListItem;
  categoryLabel: string;
};

export default function FestivalBoothDetailView({
  item,
  categoryLabel,
}: Props) {
  return (
    <div className="px-6 pb-24 flex flex-col gap-6">
      <div className="relative w-full overflow-hidden aspect-video">
        <Image
          src={item.imageUrl}
          alt={item.name}
          fill
          className="object-contain object-left"
          sizes="(max-width: 448px) 100vw, 400px"
          priority
        />
      </div>
      <div className="flex flex-col gap-9 ">
        <div>
          <div>
            <h1 className="text-[20px] font-semibold leading-snug">
              {item.name}
            </h1>
            <span className="font-medium text-md text-custom-darkgray">
              {item.host}
            </span>
          </div>

          <p className="text-custom-darkgray text-[16px] pt-4">{item.time}</p>
          <p className="text-custom-darkgray text-[16px]">{item.location}</p>
          <p className="mt-4 text-[14px] leading-relaxed whitespace-pre-wrap text-custom-darkgray bg-custom-lightgray p-4 rounded-lg">
            {item.description}
          </p>
        </div>
        <div>
          <h2 className="text-[20px] font-semibold">상품 목록</h2>
          <div className="flex flex-col ">
            {item.menu?.map((menuItem, index) => (
              <p
                key={index}
                className=" text-[16px] py-4 border-b border-[#ECEFF0] flex justify-between"
              >
                <span>{menuItem.name}</span>
                <span className="font-semibold">{menuItem.price}</span>
              </p>
            ))}
          </div>
          {item.etc && (
            <div className="mt-4 rounded-lg bg-custom-lightgray p-4">
              <p className="whitespace-pre-wrap text-[14px] leading-relaxed text-custom-darkgray">
                ** {item.etc}
              </p>
            </div>
          )}
        </div>
        <div className="flex flex-col gap-3">
          <h2 className="text-[20px] font-semibold">시설 정보</h2>
          <MiniMap boothNo={item.boothNo} zone={item.zone} />
          <p className="text-[14px] text-[#252528]">
            상명대학교 천안캠퍼스 {item.boothNo}번 부스
          </p>
        </div>
      </div>
    </div>
  );
}
