import Image from "next/image";
import type { BoothData } from "../_data/boothData";

type Props = {
  booth: BoothData;
};

export default function DummyBoothDetailView({ booth }: Props) {
  return (
    <div className="px-6 pb-24 pt-2">
      <div className="relative mx-auto aspect-4/3 w-full max-w-sm overflow-hidden rounded-2xl bg-black/5">
        <Image
          src={booth.imageUrl}
          alt={booth.name}
          fill
          className="object-cover"
          sizes="(max-width: 448px) 100vw, 400px"
          priority
        />
      </div>
      <p className="mt-3 text-[13px] font-medium text-custom-gray">
        {booth.category}
      </p>
      <h1 className="mt-1 text-[22px] font-bold leading-snug">{booth.name}</h1>
      <p className="mt-2 text-[14px] text-custom-gray">{booth.host}</p>
      <p className="mt-4 text-[15px] leading-relaxed text-custom-gray/90">
        {booth.time}
      </p>
      <p className="mt-2 text-[15px] leading-relaxed text-custom-gray/90">
        {booth.location}
      </p>
    </div>
  );
}
