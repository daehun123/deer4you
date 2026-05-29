"use client";

type AdditionalZoneSlot = {
  label: string;
  x: number;
  y: number;
  width: number;
  showLabel?: boolean;
};

const BOOTH_WIDTH = 14.7705;
const BOOTH_HEIGHT = 25.6541;

/** 상단 5칸 (좌 2칸 빈 슬롯 · 1–3) — additional-final.svg y=77.3887 */
const TOP_ROW: AdditionalZoneSlot[] = [
  // { label: "", x: 175.389, y: 77.3887, width: BOOTH_WIDTH, showLabel: false },
  // { label: "", x: 194.822, y: 77.3887, width: BOOTH_WIDTH, showLabel: false },
  { label: "1", x: 214.256, y: 77.3887, width: BOOTH_WIDTH },
  { label: "2", x: 232.916, y: 77.3887, width: BOOTH_WIDTH },
  { label: "3", x: 252.35, y: 77.3887, width: BOOTH_WIDTH },
];

/** 하단 5칸 (33, 29–32) — additional-final.svg y=126.687 */
const BOTTOM_ROW: AdditionalZoneSlot[] = [
  { label: "29", x: 98.3887, y: 126.687, width: BOOTH_WIDTH },
  { label: "30", x: 117.822, y: 126.687, width: BOOTH_WIDTH },
  { label: "31", x: 136.252, y: 126.687, width: BOOTH_WIDTH },
  { label: "32", x: 155.252, y: 126.687, width: BOOTH_WIDTH },
  { label: "33", x: 174.252, y: 126.687, width: BOOTH_WIDTH },
];

const ALL_SLOTS = [...TOP_ROW, ...BOTTOM_ROW];

type Props = {
  activeSlotId?: string | null;
};

function BoothSlotShape({
  slot,
  isActive,
}: {
  slot: AdditionalZoneSlot;
  isActive: boolean;
}) {
  const cx = slot.x + slot.width / 2;
  const cy = slot.y + BOOTH_HEIGHT / 2;
  const showLabel = slot.showLabel !== false && slot.label !== "";

  return (
    <g
      id={slot.label ? `booth-${slot.label}` : `booth-slot-${slot.x}`}
      data-booth-no={slot.label || undefined}
      className={isActive ? "is-active" : undefined}
    >
      <rect
        className="booth-fill"
        x={slot.x}
        y={slot.y}
        width={slot.width}
        height={BOOTH_HEIGHT}
        rx={0.5}
      />
      {showLabel && (
        <text
          className="booth-label"
          x={cx}
          y={cy}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {slot.label}
        </text>
      )}
    </g>
  );
}

export default function AdditionalZoneMinimap({ activeSlotId }: Props) {
  return (
    <svg
      viewBox="0 0 350 230"
      className="h-auto w-full"
      role="img"
      aria-label="추가 구역 미니맵"
    >
      <defs>
        <style>{`
          .booth-fill {
            fill: #e4e4e4;
            stroke: #dbdbdb;
            stroke-width: 0.78;
            transition: fill 0.2s ease, stroke 0.2s ease;
          }
          .booth-label {
            fill: #808080;
            font-size: 9px;
            font-weight: 700;
            pointer-events: none;
            user-select: none;
          }
          .area-label {
            fill: #9b9b9b;
            font-size: 7.5px;
            font-weight: 600;
            pointer-events: none;
            user-select: none;
          }
          g.is-active .booth-fill {
            fill: #0b89ff;
            stroke: #0b89ff;
            stroke-width: 1.1;
          }
          g.is-active .booth-label {
            fill: #ffffff;
          }
        `}</style>
      </defs>

      <rect width="350" height="230" fill="white" />

      {/* 본관 (좌상단) */}
      <path
        d="M30.4796 13.5822L31.5469 52.612C46.0052 52.8915 78.8095 53.4657 94.3604 53.5267C109.911 53.5876 130.366 51.8749 138.65 51.011L137.735 14.7254L30.4796 13.5822Z"
        fill="#E4E4E4"
        stroke="#E9E9E8"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="84"
        y="35"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        본관
      </text>

      {/* 소나무숲 */}
      <rect
        x="183.389"
        y="21.3887"
        width="99.2226"
        height="33.2226"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="233"
        y="38"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        비 흡연구역
      </text>

      <g id="booths" data-zone="additional">
        {ALL_SLOTS.map((slot) => (
          <BoothSlotShape
            key={`${slot.label}-${slot.x}-${slot.y}`}
            slot={slot}
            isActive={slot.label !== "" && activeSlotId === slot.label}
          />
        ))}
      </g>
    </svg>
  );
}
