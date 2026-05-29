"use client";

import Image from "next/image";
import React from "react";
import { type EventItem } from "../_data/eventData";

function SectionTitle({ children }: { children: React.ReactNode }) {
  return <h3 className="text-[20px] font-bold text-black">{children}</h3>;
}

function GrayBox({ children }: { children: React.ReactNode }) {
  return <div className="mt-3 bg-custom-lightgray">{children}</div>;
}

function splitListMarker(text: string) {
  const match = text.match(/^((?:\d+\.|-))(\s*)([\s\S]+)$/);
  if (!match) return null;

  return {
    marker: match[1],
    spacing: match[2].length > 0 ? match[2] : " ",
    body: match[3],
  };
}

function IndentedText({
  text,
  className,
  fallbackBullet = false,
}: {
  text: string;
  className?: string;
  fallbackBullet?: boolean;
}) {
  const parts = splitListMarker(text);
  if (!parts) {
    if (fallbackBullet) {
      return (
        <div className={className ? `flex gap-1.5 ${className}` : "flex gap-1.5"}>
          <span className="shrink-0">•</span>
          <span className="min-w-0">{text}</span>
        </div>
      );
    }

    return <span className={className}>{text}</span>;
  }

  return (
    <div className={className ? `flex ${className}` : "flex"}>
      <span className="shrink-0">{parts.marker}</span>
      <span className="shrink-0 whitespace-pre">{parts.spacing}</span>
      <span className="min-w-0">{parts.body}</span>
    </div>
  );
}

function HowToStepItem({ text }: { text: string }) {
  const trimmed = text.trim();
  const numbered = splitListMarker(trimmed);
  const dateOnly = !numbered && /^(\d+일:)(\s*)([\s\S]+)$/.exec(trimmed);

  return (
    <div className="border-b border-[#ECEEF0] py-2 text-[16px] font-semibold leading-relaxed text-black">
      {dateOnly ? (
        <div className="flex">
          <span className="shrink-0 invisible" aria-hidden="true">
            1.{" "}
          </span>
          <span className="shrink-0">{dateOnly[1]}</span>
          <span className="shrink-0 whitespace-pre">
            {dateOnly[2].length > 0 ? dateOnly[2] : " "}
          </span>
          <span className="min-w-0">{dateOnly[3]}</span>
        </div>
      ) : (
        <IndentedText text={trimmed} />
      )}
    </div>
  );
}

export default function EventDetailView({ item }: { item: EventItem }) {
  const bannerSrc = item.imageUrl;
  const hasHowTo = (item.howToSteps?.length ?? 0) > 0;
  const hasBenefitText = item.benefitItems?.some(
    (entry) => entry.kind === "line",
  );
  const hasBenefitImages = (item.benefitImageUrls?.length ?? 0) > 0;
  const hasCaution = item.cautionItems?.some((entry) => entry.kind === "line");

  return (
    <div className="flex flex-col">
      <div className="relative h-[184px] w-full bg-gray-200">
        {bannerSrc ? (
          <Image
            src={bannerSrc}
            alt={`${item.title} 배너`}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
        ) : null}
      </div>
      <div className="flex flex-col p-5 gap-2.5">
        <div>
          <div className="text-[20px] font-bold text-black">{item.title}</div>
          <div className="mt-1.5 flex flex-col gap-0.5 text-[13px] font-normal text-custom-darkgray">
            {item.targetAudience ? (
              <div>
                <span>{item.targetAudience}</span>
              </div>
            ) : null}
            {!item.hideTimeRange ? (
              <div>
                <span>{item.timeRange}</span>
              </div>
            ) : null}
            <div>
              <span>{item.location}</span>
            </div>
          </div>

          {item.descriptionLines && item.descriptionLines.length > 0 && (
            <GrayBox>
              <div className="flex flex-col p-2.5 text-[13px] font-semibold text-custom-gray opacity-40">
                {item.descriptionLines.map((t) => (
                  <div key={t}>{t}</div>
                ))}
              </div>
            </GrayBox>
          )}
        </div>

        {hasHowTo && (
          <div className="pt-2.5">
            <SectionTitle>진행 방법</SectionTitle>
            <div className="flex flex-col">
              {item.howToSteps!.map((s) => (
                <HowToStepItem key={s} text={s} />
              ))}
            </div>
          </div>
        )}

        {(hasBenefitText || hasBenefitImages) && (
          <div className="flex flex-col gap-2.5 pt-2.5">
            <SectionTitle>혜택 안내</SectionTitle>
            {hasBenefitText && (
              <div className="flex flex-col gap-4">
                {(() => {
                  let lineIndex = 0;
                  let sectionIndex = 0;
                  return item.benefitItems!.map((entry, index) => {
                    if (entry.kind === "section") {
                      const currentSectionIndex = sectionIndex;
                      sectionIndex += 1;
                      return (
                        <h4
                          key={`section-${entry.title}-${index}`}
                          className={`text-[16px] font-bold text-black ${
                            currentSectionIndex > 0 ? "mt-2" : ""
                          }`}
                        >
                          {entry.title}
                        </h4>
                      );
                    }

                    const imageUrl = item.benefitImageUrls?.[lineIndex];
                    const currentLineIndex = lineIndex;
                    lineIndex += 1;

                    return (
                      <div
                        key={`${entry.text}-${index}`}
                        className="flex flex-col gap-2"
                      >
                        <IndentedText
                          text={entry.text}
                          className="text-[14px] font-semibold leading-relaxed text-black"
                        />
                        {imageUrl ? (
                          <div className="relative aspect-[350/123] w-full overflow-hidden bg-gray-200">
                            <Image
                              src={imageUrl}
                              alt={`${item.title} 혜택 ${currentLineIndex + 1}`}
                              fill
                              sizes="100vw"
                              className="object-cover"
                            />
                          </div>
                        ) : null}
                      </div>
                    );
                  });
                })()}
              </div>
            )}
          </div>
        )}

        {(item.cautionImageUrls?.length ?? 0) > 0 && (
          <div className="pt-2.5">
            <div className="flex flex-col gap-3">
              {item.cautionImageUrls!.map((url) => (
                <div
                  key={url}
                  className="relative h-[170px] w-full overflow-hidden bg-gray-200"
                >
                  <Image
                    src={url}
                    alt={`${item.title} 유의사항 안내 이미지`}
                    fill
                    sizes="100vw"
                    className="object-cover"
                  />
                </div>
              ))}
            </div>
          </div>
        )}

        {hasCaution && (
          <div className="pt-2.5">
            <SectionTitle>이벤트 유의사항</SectionTitle>
            <ul className="mt-2.5 list-none space-y-2 text-[12px] leading-relaxed text-custom-darkgray">
              {item
                .cautionItems!.filter((entry) => entry.kind === "line")
                .map((entry, index) => (
                  <li key={`${entry.text}-${index}`}>
                    <IndentedText text={entry.text} fallbackBullet />
                  </li>
                ))}
            </ul>
          </div>
        )}
      </div>
    </div>
  );
}
