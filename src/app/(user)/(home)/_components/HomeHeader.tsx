"use client";
import React, { useMemo, useRef } from "react";
import Image from "next/image";

export default function HomeHeader() {
  const [showOverlay, setShowOverlay] = React.useState(false);

  const cCnt = useRef(0);
  const tStamp = useRef(0);

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();

    const now = Date.now();
    if (now - tStamp.current < 400) {
      cCnt.current += 1;
    } else {
      cCnt.current = 1;
    }
    tStamp.current = now;

    if ((cCnt.current ^ 5) === 0) {
      setShowOverlay(true);
      setTimeout(() => {
        setShowOverlay(false);
      }, 3000);

      cCnt.current = 0;
    }
  };

  const getAssetPath = useMemo(() => {
    if (typeof window !== "undefined") {
      return atob("L2hvbWUvYmFubmVyL2VnZy5wbmc=");
    }
    return "";
  }, []);

  return (
    <div onClick={handleClick} className="px-7.5 pt-8 pb-2.25 relative">
      <Image
        src="/logo.png"
        priority
        alt="DeerForY Logo"
        width={500}
        height={50}
      />

      {showOverlay && getAssetPath && (
        <div
          className="absolute z-[100] left-1/2 -translate-x-1/2 top-2/3 pointer-events-none"
          aria-hidden="true"
        >
          <style>
            {`
              @keyframes fAnim {
                0%, 100% { transform: scale(1); }
                15%, 45% { transform: scale(1.3); }
                30%, 70% { transform: scale(1); }
              }
              .ui-layer-fw {
                animation: fAnim 1.2s ease-in-out infinite;
                transform-origin: center center;
              }
            `}
          </style>
          <div className="ui-layer-fw">
            <Image
              src={getAssetPath}
              alt="bg-overlay"
              width={500}
              height={500}
              className="max-w-[150vw] sm:max-w-none"
              priority
            />
          </div>
        </div>
      )}
    </div>
  );
}
