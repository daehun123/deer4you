"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import { boothMapPoints, type BoothMapPoint } from "../_data/boothMapPoints";

const DEFAULT_ZOOM = 18;

function averageCenter(points: BoothMapPoint[]) {
  const fallback = { lat: 36.833678, lng: 127.179155 };
  if (!points.length) return fallback;
  let lat = 0;
  let lng = 0;
  for (const p of points) {
    lat += p.lat;
    lng += p.lng;
  }
  const n = points.length;
  return { lat: lat / n, lng: lng / n };
}

declare global {
  interface Window {
    naver?: NaverNamespace;
  }
}

type NaverLatLng = { lat: () => number; lng: () => number };

type NaverMapInstance = {
  setCenter: (latLng: NaverLatLng) => void;
  setZoom: (zoom: number) => void;
};

type NaverMarkerInstance = {
  setMap: (map: NaverMapInstance | null) => void;
  getPosition?: () => NaverLatLng;
};

type NaverSize = { width: number; height: number };
type NaverPoint = { x: number; y: number };

type NaverNamespace = {
  maps?: {
    Map: new (
      el: HTMLElement,
      options: {
        center: NaverLatLng;
        zoom: number;
        zoomControl: boolean;
        zoomControlOptions: { position: unknown };
      },
    ) => NaverMapInstance;
    Marker: new (options: {
      position: NaverLatLng;
      map: NaverMapInstance;
      title: string;
      icon?: unknown;
      draggable?: boolean;
    }) => NaverMarkerInstance;
    LatLng: new (lat: number, lng: number) => NaverLatLng;
    Size?: new (width: number, height: number) => NaverSize;
    Point?: new (x: number, y: number) => NaverPoint;
    Position: { TOP_RIGHT: unknown };
    Event?: {
      addListener: (
        target: unknown,
        eventName: string,
        listener: () => void,
      ) => void;
    };
  };
};

type Props = {
  points: BoothMapPoint[];
  onPointClick?: (point: BoothMapPoint) => void;
  mapHeightClassName?: string;
  initialCenter?: { lat: number; lng: number };
  initialZoom?: number;
};

function loadNaverMapsScript(ncpClientId: string) {
  const src = `https://oapi.map.naver.com/openapi/v3/maps.js?ncpKeyId=${encodeURIComponent(
    ncpClientId,
  )}`;

  return new Promise<void>((resolve, reject) => {
    if (typeof window === "undefined") return reject(new Error("No window"));
    if (window.naver?.maps) return resolve();

    const existing = document.querySelector<HTMLScriptElement>(
      `script[data-naver-maps="true"]`,
    );
    if (existing) {
      existing.addEventListener("load", () => resolve(), { once: true });
      existing.addEventListener(
        "error",
        () => reject(new Error("Failed to load")),
        {
          once: true,
        },
      );
      return;
    }

    const script = document.createElement("script");
    script.src = src;
    script.async = true;
    script.defer = true;
    script.dataset.naverMaps = "true";
    script.onload = () => resolve();
    script.onerror = () => reject(new Error("Failed to load"));
    document.head.appendChild(script);
  });
}

export default function NaverMap({
  points,
  onPointClick,
  mapHeightClassName = "h-[70vh]",
  initialCenter,
  initialZoom,
}: Props) {
  const ref = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<NaverMapInstance | null>(null);
  const markersRef = useRef<NaverMarkerInstance[]>([]);
  const [ready, setReady] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  const clientId = process.env.NEXT_PUBLIC_NAVER_MAP_CLIENT_ID || "";
  const mapBaseCenter = useMemo(() => {
    if (
      initialCenter != null &&
      Number.isFinite(initialCenter.lat) &&
      Number.isFinite(initialCenter.lng)
    ) {
      return initialCenter;
    }
    return averageCenter(boothMapPoints);
  }, [initialCenter]);

  const mapZoom = initialZoom ?? DEFAULT_ZOOM;

  useEffect(() => {
    let cancelled = false;

    async function init() {
      if (!ref.current) return;
      if (!clientId) return;

      await loadNaverMapsScript(clientId);
      if (cancelled) return;
      const naver = window.naver;
      if (!naver?.maps) {
        throw new Error("NAVER_MAPS_SDK_LOADED_BUT_NO_NAMESPACE");
      }

      if (!mapRef.current) {
        mapRef.current = new naver.maps.Map(ref.current, {
          center: new naver.maps.LatLng(mapBaseCenter.lat, mapBaseCenter.lng),
          zoom: mapZoom,
          zoomControl: false,
          zoomControlOptions: { position: naver.maps.Position.TOP_RIGHT },
        });
      }

      setLoadError(null);
      setReady(true);
    }

    init().catch((e: unknown) => {
      if (cancelled) return;
      const message = e instanceof Error ? e.message : String(e);
      setLoadError(message);
      setReady(false);
    });

    return () => {
      cancelled = true;
    };
  }, [clientId, mapBaseCenter.lat, mapBaseCenter.lng, mapZoom]);

  useEffect(() => {
    if (!ready) return;
    const naver = window.naver;
    const map = mapRef.current;
    if (!naver?.maps || !map) return;

    for (const m of markersRef.current) {
      m.setMap(null);
    }
    markersRef.current = [];

    for (const p of points) {
      const pos = new naver.maps.LatLng(p.lat, p.lng);
      const iconUrlByCategory: Record<BoothMapPoint["category"], string> = {
        무대: "/markers/marker-stage.svg",
        푸드트럭: "/markers/marker-food.svg",
        운영본부: "/markers/marker-hq.svg",
        흡연구역: "/markers/marker-smoking.svg",
        금연구역: "/markers/marker-nosmoking.svg",
        화장실: "/markers/marker-toilet.svg",
        의무실: "/markers/marker-medical.svg",
        부스: "/markers/marker-activity.svg",
      };
      const iconUrl = iconUrlByCategory[p.category];
      const iconSize = naver.maps.Size
        ? new naver.maps.Size(34, 34)
        : undefined;
      const iconAnchor = naver.maps.Point
        ? new naver.maps.Point(17, 34)
        : undefined;
      const marker = new naver.maps.Marker({
        position: pos,
        map,
        title: p.name,
        icon: {
          url: iconUrl,
          size: iconSize,
          anchor: iconAnchor,
        },
        draggable: false,
      });
      if (onPointClick && naver.maps.Event?.addListener) {
        naver.maps.Event.addListener(marker, "click", () => onPointClick(p));
      }
      markersRef.current.push(marker);
    }

    map.setCenter(new naver.maps.LatLng(mapBaseCenter.lat, mapBaseCenter.lng));
    map.setZoom(mapZoom);
  }, [
    ready,
    points,
    mapBaseCenter.lat,
    mapBaseCenter.lng,
    mapZoom,
    onPointClick,
  ]);

  if (!clientId) {
    return (
      <div className="rounded-xl bg-white p-4 shadow-sm">
        <div className="text-[15px] font-bold">네이버 지도 설정이 필요해요</div>
        <div className="mt-1 text-[13px] text-custom-gray opacity-80">
          `.env.local`에 `NEXT_PUBLIC_NAVER_MAP_CLIENT_ID`를 설정하면 지도가
          표시됩니다.
        </div>
        <div
          className={[
            "mt-3 w-full rounded-lg bg-[#E0E0E0]",
            mapHeightClassName,
          ].join(" ")}
        />
      </div>
    );
  }

  return (
    <div className="relative z-0 overflow-hidden rounded-xl bg-white shadow-sm">
      {loadError && (
        <div className="border-b border-black/5 bg-amber-50 px-4 py-3">
          <div className="text-[13px] font-bold text-amber-900">
            네이버 지도 로드 실패
          </div>
          <div className="mt-1 text-[12px] text-amber-900/80">
            origin:{" "}
            <span className="font-mono">
              {typeof window !== "undefined" ? window.location.origin : ""}
            </span>
            <br />
            ncpClientId: <span className="font-mono">{clientId}</span>
            <br />
            error: <span className="font-mono">{loadError}</span>
          </div>
        </div>
      )}
      <div
        ref={ref}
        className={["w-full bg-[#E0E0E0]", mapHeightClassName].join(" ")}
      />
    </div>
  );
}
