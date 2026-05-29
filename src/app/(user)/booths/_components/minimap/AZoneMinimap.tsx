"use client";

type BoothSlot = {
  /** 지도 표시 번호 (1–13, boothNo와 매칭) */
  label: string;
  x: number;
  y: number;
};

/** A구역(소나무숲) 부스 — 지도 좌표 기준 좌→우 */
const TOP_ROW: BoothSlot[] = [
  { label: "1", x: 170.389, y: 129.091 },
  { label: "2", x: 189.822, y: 129.091 },
  { label: "3", x: 209.256, y: 129.091 },
  { label: "4", x: 227.916, y: 129.091 },
  { label: "5", x: 247.35, y: 129.091 },
  { label: "6", x: 266.008, y: 129.091 },
  { label: "7", x: 284.686, y: 129.389 },
];

const BOTTOM_ROW: BoothSlot[] = [
  { label: "8", x: 170.389, y: 178.389 },
  { label: "9", x: 189.822, y: 178.389 },
  { label: "10", x: 208.252, y: 178.389 },
  { label: "11", x: 227.252, y: 178.389 },
  { label: "12", x: 246.252, y: 178.389 },
  { label: "13", x: 265.389, y: 178.389 },
];

const BOOTH_WIDTH = 14.7705;
const BOOTH_HEIGHT = 25.6541;

type Props = {
  activeSlotId?: string | null;
};

function BoothSlotShape({
  slot,
  activeSlotId,
}: {
  slot: BoothSlot;
  activeSlotId?: string | null;
}) {
  const isActive = activeSlotId === slot.label;
  const cx = slot.x + BOOTH_WIDTH / 2;
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
        width={BOOTH_WIDTH}
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

      {/* 한누리관 */}
      <path
        d="M51.2432 76.8755L52.3105 115.905C66.7688 116.185 99.5732 116.759 115.124 116.82C130.675 116.881 151.13 115.168 159.414 114.304L158.499 78.0187L51.2432 76.8755Z"
        fill="#E4E4E4"
        stroke="#E9E9E8"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="105"
        y="98"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        한누리관
      </text>

      {/* 소나무숲 */}
      <rect
        x="171.092"
        y="78.5601"
        width="111.168"
        height="33.4281"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="226.7"
        y="95.3"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        소나무숲
      </text>

      <path
        d="M51.2432 20.2363L52.3105 59.2661C66.7688 59.5456 99.5732 60.1198 115.124 60.1807C130.675 60.2417 151.13 58.529 159.414 57.665L158.499 21.3795L51.2432 20.2363Z"
        fill="#F8F8F6"
        stroke="#E9E9E8"
        strokeWidth="0.777397"
      />

      <g id="booths" data-zone="A">
        {TOP_ROW.map((slot) => (
          <BoothSlotShape
            key={slot.label}
            slot={slot}
            activeSlotId={activeSlotId}
          />
        ))}
        {BOTTOM_ROW.map((slot) => (
          <BoothSlotShape
            key={slot.label}
            slot={slot}
            activeSlotId={activeSlotId}
          />
        ))}
      </g>
    </svg>
  );
}
