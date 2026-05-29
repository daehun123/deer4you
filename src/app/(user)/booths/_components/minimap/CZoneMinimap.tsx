"use client";

type CZoneSlot = {
  label: string;
  x: number;
  y: number;
  width: number;
};

const BOOTH_HEIGHT = 25.6541;
const BOOTH_WIDTH = 14.7705;

/** C구역 부스 슬롯 — Czone-final.svg 좌표 (22–27 상단, 28·56 우측, 51–55 하단) */
const ALL_SLOTS: CZoneSlot[] = [
  { label: "22", x: -9.18552, y: 60.2757, width: 15.5479 },
  { label: "23", x: 10.2481, y: 60.2757, width: 14.7705 },
  { label: "24", x: 28.9063, y: 60.2757, width: 15.5479 },
  { label: "25", x: 77.1035, y: 60.2757, width: 15.5479 },
  { label: "26", x: 96.541, y: 60.2757, width: 14.7705 },
  { label: "27", x: 115.197, y: 60.2757, width: 15.5479 },
  { label: "28", x: 142.389, y: 94.3887, width: 15.5479 },
  { label: "56", x: 142.389, y: 126.389, width: 14.7705 },
  { label: "51", x: 39.0137, y: 161.337, width: BOOTH_WIDTH },
  { label: "52", x: 58.4473, y: 161.337, width: BOOTH_WIDTH },
  { label: "53", x: 77.1035, y: 161.337, width: BOOTH_WIDTH },
  { label: "54", x: 95.7617, y: 161.337, width: BOOTH_WIDTH },
  { label: "55", x: 115.197, y: 161.337, width: BOOTH_WIDTH },
];

type Props = {
  activeSlotId?: string | null;
};

function BoothSlotShape({
  slot,
  isActive,
}: {
  slot: CZoneSlot;
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

export default function CZoneMinimap({ activeSlotId }: Props) {
  return (
    <svg
      viewBox="0 0 350 230"
      className="h-auto w-full"
      role="img"
      aria-label="C구역 미니맵"
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
        d="M-198.483 50.9469H-217.141C-207.034 0.416168 -210.144 -48.9487 -212.865 -74.9915C-215.042 -93.8257 -215.068 -107.253 -214.808 -110.363C-209.522 -145.812 -176.068 -154.675 -160.002 -154.675C-78.7639 -158.95 86.9772 -167.579 100.037 -167.89C113.098 -168.201 117.399 -152.731 117.918 -144.957C121.649 -130.342 111.18 -126.947 105.479 -127.077L109.366 -115.805L-1.41289 -110.363C14.757 -87.5288 16.4673 -64.6261 15.3012 -54.7791H-4.13377V-36.5103L-24.3461 -39.6199L-30.5653 -22.1284L-19.6817 -14.7431C-27.4557 -0.128082 -38.728 10.2631 -43.3923 13.6319C-75.4211 43.4839 -127.999 35.399 -150.284 27.625L-165.444 38.5086L-198.483 41.6181V50.9469Z"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <path
        d="M9.08249 30.3458C0.0646782 36.876 -36.9135 36.6946 -54.2754 35.7876C-43.5214 24.904 -20.3809 1.11569 -13.8507 -6.96924C-7.32059 -15.0542 1.30851 -10.338 4.8068 -6.96924L26.9626 8.5787C24.76 13.1135 18.1003 23.8157 9.08249 30.3458Z"
        fill="#F8F8F6"
        stroke="#E0E0E0"
        strokeWidth="0.777397"
      />
      <path
        d="M43.6748 -12.4111L88.3752 -72.2707L94.9834 -81.9881C100.27 -88.2073 109.106 -87.9482 112.864 -87.0412C123.436 -87.0412 126.079 -80.822 126.079 -77.7124V25.6814C126.079 37.1869 117.269 38.5084 112.864 37.731C93.8173 37.4719 54.4032 36.7204 49.1169 35.7876C42.509 34.6215 40.5653 28.791 39.7879 11.2995C39.1659 -2.6936 42.12 -10.338 43.6748 -12.4111Z"
        fill="#F8F8F6"
        stroke="#E0E0E0"
        strokeWidth="0.777397"
      />

      <text
        className="area-label"
        x="85"
        y="20"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        비 흡연구역
      </text>

      <path
        d="M333.493 -77.3363L292.23 -103C283.571 -94.3554 259.76 -41.7674 248.937 -16.554L239.128 -20.6062L221.879 46.9297L228.305 48.9558C206.117 110.278 204.629 208.228 206.659 249.538L231.011 247.174V254.603H250.29V245.148H256.039C255.228 226.778 257.731 170.633 259.083 144.857L270.921 85.7629L289.524 90.8281C294.394 64.0839 312.523 14.8502 320.979 -6.42363L303.053 -14.1903C309.547 -33.6406 326.052 -64.392 333.493 -77.3363Z"
        fill="#E4E4E4"
        stroke="#E9E9E8"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="258"
        y="72"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        디자인대학
      </text>

      <path
        d="M95.4803 204.483H-217.918V255.791H139.685C139.685 216.113 110.215 205.053 95.4803 204.483Z"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="1.25907"
      />

      <g id="booths" data-zone="C">
        {ALL_SLOTS.map((slot) => (
          <BoothSlotShape
            key={`${slot.label}-${slot.x}-${slot.y}`}
            slot={slot}
            isActive={activeSlotId === slot.label}
          />
        ))}
      </g>
    </svg>
  );
}
