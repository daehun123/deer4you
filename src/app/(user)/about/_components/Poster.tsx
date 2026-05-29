import React from "react";
import Image from "next/image";
export default function Poster() {
  return (
    <div
      className="pt-14.5 px-7.5 pb-18.25 flex flex-col items-center gap-4.5"
      style={{
        background:
          "linear-gradient(180deg, #FFFFFF 0%, #53F1EB 28.37%, #0B89FF 58.66%, #313131 91.83%)",
      }}
    >
      <Image
        src="/logo.png"
        alt="Logo"
        width={400}
        height={50}
        priority={true}
      />
      <Image
        src="/poster.webp"
        alt="Poster"
        width={800}
        height={1200}
        priority={true}
      />
    </div>
  );
}
