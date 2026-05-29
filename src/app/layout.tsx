import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Deer for U: ARCHIVE",
  description: "2026학년도 상명대학교 대동제 공식 축제 웹사이트입니다.",
  openGraph: {
    title: "Deer for U: ARCHIVE",
    description:
      "2026학년도 상명대학교 대동제 공식 축제 웹사이트입니다. 부스 및 공연 정보를 확인하세요!",
    url: "https://deer4you.site",
    siteName: "Deer for U: ARCHIVE",
    locale: "ko_KR",
    type: "website",
    images: [
      {
        url: "/poster.webp",
        width: 1200,
        height: 630,
        alt: "Deer for U: ARCHIVE 미리보기 이미지",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <body className="bg-gray-100 antialiased">{children}</body>
    </html>
  );
}
