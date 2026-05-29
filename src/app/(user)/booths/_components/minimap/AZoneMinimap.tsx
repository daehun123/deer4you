"use client";

type BoothSlot = {
  label: string;
  x: number;
  y: number;
  width: number;
};

const BOOTH_HEIGHT = 25.6541;

/** A구역(소나무숲) — Azone-final.svg 좌표, 상단 4–10 · 하단 34–39 */
const TOP_ROW: BoothSlot[] = [
  { label: "4", x: 164.389, y: 85.3887, width: 14.7705 },
  { label: "5", x: 183.822, y: 85.3887, width: 14.7705 },
  { label: "6", x: 203.256, y: 85.3887, width: 14.7705 },
  { label: "7", x: 221.916, y: 85.3887, width: 14.7705 },
  { label: "8", x: 241.35, y: 85.3887, width: 14.7705 },
  { label: "9", x: 260.008, y: 85.3887, width: 14.7705 },
  { label: "10", x: 278.686, y: 85.6866, width: 14.7705 },
];

const BOTTOM_ROW: BoothSlot[] = [
  { label: "34", x: 164.389, y: 134.687, width: 14.7705 },
  { label: "35", x: 183.822, y: 134.687, width: 14.7705 },
  { label: "36", x: 202.252, y: 134.687, width: 14.7705 },
  { label: "37", x: 221.252, y: 134.687, width: 14.7705 },
  { label: "38", x: 240.252, y: 134.687, width: 14.7705 },
  { label: "39", x: 259.389, y: 134.687, width: 14.7705 },
];

const ALL_SLOTS = [...TOP_ROW, ...BOTTOM_ROW];

type Props = {
  activeSlotId?: string | null;
};

function BoothSlotShape({
  slot,
  isActive,
}: {
  slot: BoothSlot;
  isActive: boolean;
}) {
  const cx = slot.x + slot.width / 2;
  const cy = slot.y + BOOTH_HEIGHT / 2;

  return (
    <g
      id={`booth-${slot.label}`}
      data-booth-no={slot.label}
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
      <text
        className="booth-label"
        x={cx}
        y={cy}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {slot.label}
      </text>
    </g>
  );
}

export default function AZoneMinimap({ activeSlotId }: Props) {
  return (
    <svg
      viewBox="0 0 350 230"
      className="h-auto w-full"
      role="img"
      aria-label="A구역 미니맵"
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

      <path
        d="M26.4796 33.5822L27.5469 72.612C42.0052 72.8915 74.8095 73.4657 90.3604 73.5267C105.911 73.5876 126.366 71.8749 134.65 71.011L133.735 34.7254L26.4796 33.5822Z"
        fill="#E4E4E4"
        stroke="#E9E9E8"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="80"
        y="55"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        한누리관
      </text>

      <rect
        x="192.092"
        y="35.2669"
        width="111.168"
        height="33.4281"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="247.7"
        y="52"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        소나무숲
      </text>

      <rect
        x="118.611"
        y="85.3887"
        width="58.2226"
        height="21.2226"
        transform="rotate(90 118.611 85.3887)"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="129"
        y="92"
        textAnchor="middle"
        dominantBaseline="middle"
        transform="rotate(-90 129 112)"
      >
        계단
      </text>

      <g id="booths" data-zone="A">
        {ALL_SLOTS.map((slot) => (
          <BoothSlotShape
            key={slot.label}
            slot={slot}
            isActive={activeSlotId === slot.label}
          />
        ))}
      </g>
    </svg>
  );
}
