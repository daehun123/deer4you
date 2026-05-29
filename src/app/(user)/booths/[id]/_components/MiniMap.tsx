import AZoneMinimap from "../../_components/minimap/AZoneMinimap";
import AdditionalZoneMinimap from "../../_components/minimap/AdditionalZoneMinimap";
import BZoneMinimap from "../../_components/minimap/BZoneMinimap";
import CZoneMinimap from "../../_components/minimap/CZoneMinimap";

interface Props {
  boothNo?: number;
  zone?: "A" | "B" | "C" | "additional";
  location?: string;
}

export default function MiniMap({ boothNo, zone, location }: Props) {
  const slotId = boothNo?.toString();

  if (zone === "A") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-[#ECEFF0] bg-white p-2">
        <AZoneMinimap activeSlotId={slotId} />
      </div>
    );
  }

  if (zone === "B") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-[#ECEFF0] bg-white p-2">
        <BZoneMinimap activeSlotId={slotId} />
      </div>
    );
  }

  if (zone === "C") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-[#ECEFF0] bg-white p-2">
        <CZoneMinimap activeSlotId={slotId} />
      </div>
    );
  }

  if (zone === "additional") {
    return (
      <div className="w-full overflow-hidden rounded-lg border border-[#ECEFF0] bg-white p-2">
        <AdditionalZoneMinimap activeSlotId={slotId} />
      </div>
    );
  }

  return (
    <div className="flex h-60 w-full items-center justify-center rounded-lg bg-custom-lightgray text-[14px] text-custom-darkgray">
      {zone ? `${zone}구역 지도 준비 중` : "지도 준비 중"}
      {slotId && <span className="ml-1 text-[12px]">({slotId})</span>}
    </div>
  );
}
