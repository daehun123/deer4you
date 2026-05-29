"use client";

import { experienceList } from "@/data/festival/experiences";
import { externalCompanyList } from "@/data/festival/external-company";
import type { FestivalListItem } from "@/data/festival/types";

type BZoneSlot = {
  label: string;
  x: number;
  y: number;
  width: number;
  locationKey?: string;
};

const BOOTH_HEIGHT = 25.6541;

const TOP_WIDTHS = [
  15.5479, 15.5479, 14.7705, 15.5479, 14.7705, 15.5479, 15.5479, 15.5479,
  15.5479, 14.7705, 15.5479, 15.5479, 14.7705, 15.5479,
];

const TOP_ROW: { x: number; y: number }[] = [
  { x: 55.6934, y: 62.2757 },
  { x: 75.1289, y: 62.2757 },
  { x: 94.5645, y: 62.2757 },
  { x: 113.221, y: 62.2757 },
  { x: 132.656, y: 62.2757 },
  { x: 151.314, y: 62.2757 },
  { x: 169.971, y: 62.2757 },
  { x: 189.404, y: 62.2757 },
  { x: 208.064, y: 62.2757 },
  { x: 227.498, y: 62.2757 },
  { x: 246.156, y: 62.2757 },
  { x: 264.814, y: 62.2757 },
  { x: 284.248, y: 62.2757 },
  { x: 302.906, y: 62.2757 },
];

const BOTTOM_ROW: { x: number; y: number }[] = [
  { x: 55.6934, y: 163.337 },
  { x: 75.1289, y: 163.337 },
  { x: 94.5645, y: 163.337 },
  { x: 113.221, y: 163.337 },
  { x: 132.656, y: 163.337 },
  { x: 151.314, y: 163.337 },
  { x: 169.971, y: 163.337 },
  { x: 189.404, y: 163.337 },
  { x: 208.064, y: 163.337 },
  { x: 227.498, y: 163.337 },
  { x: 246.156, y: 163.337 },
];

const BOTTOM_WIDTH = 14.7705;

const ISOLATED_ROW: BZoneSlot[] = [
  {
    label: "5",
    x: 313.014,
    y: 163.337,
    width: BOTTOM_WIDTH,
    locationKey: "A-1-5",
  },
  {
    label: "6",
    x: 332.447,
    y: 163.337,
    width: BOTTOM_WIDTH,
    locationKey: "A-1-6",
  },
];

/** B구역 전체 부스 슬롯 (1–14, 15–25, 우측 5·6) */
const ALL_SLOTS: BZoneSlot[] = [
  ...TOP_ROW.map((coord, i) => {
    const mapNo = i + 1;
    return {
      label: String(mapNo),
      x: coord.x,
      y: coord.y,
      width: TOP_WIDTHS[i],
      locationKey: mapNo === 5 || mapNo === 6 ? undefined : `A-1-${mapNo}`,
    };
  }),
  ...BOTTOM_ROW.map((coord, i) => ({
    label: String(15 + i),
    x: coord.x,
    y: coord.y,
    width: BOTTOM_WIDTH,
    locationKey: `A-2-${i + 1}`,
  })),
  ...ISOLATED_ROW,
];

function parseLocationKey(location?: string): string | null {
  if (!location) return null;
  const match = location.match(/A-\d+-\d+/);
  return match ? match[0] : null;
}

function findBZoneBooth(
  activeSlotId: string,
): FestivalListItem | undefined {
  const match = (item: FestivalListItem) =>
    item.zone === "B" &&
    item.boothNo != null &&
    String(item.boothNo) === activeSlotId;

  return (
    experienceList.find(match) ?? externalCompanyList.find(match)
  );
}

function resolveActiveLocation(activeSlotId?: string | null): string | null {
  if (!activeSlotId) return null;

  const booth = findBZoneBooth(activeSlotId);
  return parseLocationKey(booth?.location);
}

type Props = {
  activeSlotId?: string | null;
};

function BoothSlotShape({
  slot,
  isActive,
}: {
  slot: BZoneSlot;
  isActive: boolean;
}) {
  const cx = slot.x + slot.width / 2;
  const cy = slot.y + BOOTH_HEIGHT / 2;

  return (
    <g
      id={`booth-${slot.label}${slot.locationKey ? `-${slot.locationKey}` : ""}`}
      data-booth-no={slot.label}
      data-location={slot.locationKey}
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

export default function BZoneMinimap({ activeSlotId }: Props) {
  const activeLocation = resolveActiveLocation(activeSlotId);

  return (
    <svg
      viewBox="0 0 350 230"
      className="h-auto w-full"
      role="img"
      aria-label="B구역 미니맵"
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

      {/* 학생회관 */}
      <path
        d="M75.5169 52.9469H56.8594C66.9655 2.41617 63.856 -46.9487 61.1351 -72.9915C58.9583 -93.8257 58.9324 -105.253 59.1916 -108.363C64.4779 -143.812 97.9319 -152.675 113.998 -152.675C195.236 -156.95 360.977 -165.579 374.037 -165.89C387.098 -166.201 391.399 -150.731 391.918 -142.957C395.649 -128.342 385.18 -124.947 379.479 -125.077L383.366 -113.805L272.587 -108.363C288.757 -87.5288 290.467 -62.6261 289.301 -52.7791H269.866V-34.5103L249.654 -37.6199L243.435 -20.1284L254.318 -12.7431C246.544 1.87192 235.272 12.2631 230.608 15.6319C198.579 45.4839 146.001 37.399 123.716 29.625L108.556 40.5086L75.5169 43.6181V52.9469Z"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="0.777397"
      />
      <path
        d="M177.745 23.4057C82.592 28.692 76.6837 -49.281 85.6238 -88.9282L115.943 -78.4333V-88.9282H123.717C139.575 -126.243 164.53 -139.459 175.025 -141.403C250.899 -155.707 277.9 -93.7222 281.917 -60.9419L264.814 -58.9984L262.482 -39.5635L243.824 -42.2844C233.874 6.53615 195.626 21.8509 177.745 23.4057Z"
        fill="#E4E4E4"
        stroke="#DCDCDC"
        strokeWidth="0.777397"
      />
      <path
        d="M283.082 32.3458C274.065 38.876 237.086 38.6946 219.725 37.7876C230.479 26.904 253.619 3.11569 260.149 -4.96924C266.679 -13.0542 275.309 -8.33796 278.807 -4.96924L300.963 10.5787C298.76 15.1135 292.1 25.8157 283.082 32.3458Z"
        fill="#F8F8F6"
        stroke="#E0E0E0"
        strokeWidth="0.777397"
      />
      <path
        d="M317.675 -10.4111L362.375 -70.2707L368.983 -79.9881C374.27 -86.2073 383.106 -85.9482 386.864 -85.0412C397.436 -85.0412 400.079 -78.822 400.079 -75.7124V27.6814C400.079 39.1869 391.269 40.5084 386.864 39.731C367.817 39.4719 328.403 38.7204 323.117 37.7876C316.509 36.6215 314.565 30.791 313.788 13.2995C313.166 -0.693604 316.12 -8.33801 317.675 -10.4111Z"
        fill="#F8F8F6"
        stroke="#E0E0E0"
        strokeWidth="0.777397"
      />
      <text
        className="area-label"
        x="168"
        y="16"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        학생회관
      </text>

      {/* 운동장 */}
      <path
        d="M369.48 206.483H56.082V257.791H413.685C413.685 218.113 384.215 207.053 369.48 206.483Z"
        fill="#F8F8F6"
        stroke="#DBDBDB"
        strokeWidth="1.25907"
      />
      <text
        className="area-label"
        x="212"
        y="215"
        textAnchor="middle"
        dominantBaseline="middle"
      >
        운동장
      </text>

      <g id="booths" data-zone="B">
        {ALL_SLOTS.map((slot) => {
          const isActive =
            activeLocation != null && slot.locationKey === activeLocation;
          return (
            <BoothSlotShape
              key={`${slot.label}-${slot.x}-${slot.y}`}
              slot={slot}
              isActive={isActive}
            />
          );
        })}
      </g>
    </svg>
  );
}
