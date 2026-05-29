"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";

type Snap = "collapsed" | "half" | "mid" | "full";

type Props = {
  open: boolean;
  title?: string;
  onClose: () => void;
  children: React.ReactNode;
  initialSnap?: Snap;
  bottomInsetPx?: number;
  topLimitPx?: number;
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}

export default function BottomSheet({
  open,
  title,
  onClose,
  children,
  initialSnap = "half",
  bottomInsetPx = 100,
  topLimitPx = 0,
}: Props) {
  const sheetRef = useRef<HTMLDivElement | null>(null);
  const startYRef = useRef<number | null>(null);
  const startOffsetRef = useRef<number>(0);

  const rawViewportHeight =
    typeof window !== "undefined"
      ? (window.visualViewport?.height ?? window.innerHeight)
      : 800;
  const effectiveBottomInsetPx = Math.min(
    bottomInsetPx,
    Math.max(0, rawViewportHeight - 60),
  );

  const snapOffsets = useMemo(() => {
    const rawVh =
      typeof window !== "undefined"
        ? (window.visualViewport?.height ?? window.innerHeight)
        : 800;
    const inset = Math.min(bottomInsetPx, Math.max(0, rawVh - 60));
    const vh = Math.max(0, rawVh - inset);
    const collapsedOffset = Math.round(vh - 120);
    const halfOffset = Math.round(vh * 0.4); // 기본을 60% 정도로
    const fullOffset = Math.round(clamp(topLimitPx, 0, collapsedOffset)); // 카테고리 영역까지
    const minOffset = fullOffset;
    const maxOffset = collapsedOffset;
    const halfSnap = clamp(halfOffset, minOffset, maxOffset);
    const midSnap = clamp(
      Math.round(minOffset + (halfSnap - minOffset) * 0.5),
      minOffset,
      maxOffset,
    );
    return {
      vh,
      maxHeight: vh - minOffset,
      bySnap: {
        full: minOffset,
        mid: midSnap,
        half: halfSnap,
        collapsed: maxOffset,
      } satisfies Record<Snap, number>,
      minOffset,
      maxOffset,
    };
  }, [bottomInsetPx, topLimitPx]);

  const initialOffset = snapOffsets.bySnap[initialSnap];
  const [offsetY, setOffsetY] = useState(() => initialOffset);
  const [dragging, setDragging] = useState(false);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;

    function onKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") onClose();
    }
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open, onClose]);

  const settleToNearest = (currentOffset: number, velocityPxPerMs: number) => {
    const bySnap = snapOffsets.bySnap;
    const candidates: Snap[] = ["full", "mid", "half", "collapsed"];

    // 빠르게 아래로 던지면 닫기
    if (velocityPxPerMs > 1.0 && currentOffset > bySnap.half) {
      onClose();
      return;
    }

    const nearest = candidates.reduce((best, s) => {
      const d = Math.abs(currentOffset - bySnap[s]);
      const bestD = Math.abs(currentOffset - bySnap[best]);
      return d < bestD ? s : best;
    }, "half" as Snap);

    setOffsetY(bySnap[nearest]);

    // 충분히 아래로 내리면 닫기
    if (nearest === "collapsed" && currentOffset > bySnap.collapsed + 60) {
      onClose();
    }
  };

  const onPointerDown = (e: React.PointerEvent) => {
    if (!open) return;
    startYRef.current = e.clientY;
    startOffsetRef.current = offsetY;
    setDragging(true);
    (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!open) return;
    if (startYRef.current == null) return;
    const dy = e.clientY - startYRef.current;
    const DRAG_DAMPING = 0.65;
    const next = clamp(
      startOffsetRef.current + dy * DRAG_DAMPING,
      snapOffsets.minOffset,
      snapOffsets.vh,
    );
    setOffsetY(next);
  };

  const onPointerUp = (e: React.PointerEvent) => {
    if (!open) return;
    if (startYRef.current == null) return;
    const dy = e.clientY - startYRef.current;
    const dt = 180;
    const velocity = dy / dt;
    startYRef.current = null;
    setDragging(false);
    settleToNearest(offsetY, velocity);
  };
  const onPointerCancel = () => {
    if (!open) return;
    startYRef.current = null;
    setDragging(false);
  };

  if (!open) return null;

  const translateY = offsetY;
  const height = Math.max(0, snapOffsets.vh - offsetY);
  const bottomInsetCss = `calc(${effectiveBottomInsetPx}px + env(safe-area-inset-bottom))`;

  return (
    <div className="fixed inset-0 z-40">
      <button
        type="button"
        className="absolute top-0 w-full left-1/2 -translate-x-1/2 max-w-md bg-transparent"
        style={{ bottom: bottomInsetCss }}
        aria-label="바텀시트 닫기"
        onClick={onClose}
      />

      <div
        ref={sheetRef}
        className={[
          "absolute w-full max-w-md left-1/2 rounded-t-3xl bg-white flex flex-col ",
          dragging
            ? "transition-none"
            : "transition-transform duration-200 ease-out",
        ].join(" ")}
        style={{
          bottom: bottomInsetCss,
          transform: `translate3d(-50%, ${translateY}px, 0)`,
          height,
        }}
        role="dialog"
        aria-modal="true"
        aria-label={title ?? "바텀시트"}
      >
        {/* 그랩바 */}
        <div className="pt-2 shrink-0">
          <div
            className={[
              "mx-auto w-14 h-7 flex items-center justify-center",
              "cursor-grab active:cursor-grabbing select-none",
            ].join(" ")}
            style={{ touchAction: "none" }}
            onPointerDown={onPointerDown}
            onPointerMove={onPointerMove}
            onPointerUp={onPointerUp}
            onPointerCancel={onPointerCancel}
            aria-label="바텀시트 드래그 핸들"
            role="button"
            tabIndex={0}
          >
            <div className="h-1.5 w-12 rounded-full bg-black/15" />
          </div>
        </div>

        {title && (
          <div className="px-5 py-1 text-xl font-bold shrink-0">{title}</div>
        )}

        <div
          className="px-5 pb-10 pt-3 overflow-y-auto flex-1 min-h-0 scrollbar-hide [&::-webkit-scrollbar]:hidden"
          style={{
            scrollbarWidth: "none",
            msOverflowStyle: "none",
            paddingBottom: `calc(env(safe-area-inset-bottom) + ${translateY + 40}px)`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
}
