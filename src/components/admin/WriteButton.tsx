import Link from "next/link";
import React from "react";

interface WriteButtonProps {
  link: string;
}

export default function WriteButton({ link }: WriteButtonProps) {
  return (
    <div className="fixed bottom-10 w-full max-w-md pointer-events-none z-50">
      <div className="relative w-full h-full">
        <Link
          href={link}
          className="absolute right-6 bottom-0 flex flex-col items-center justify-center w-21 h-21 bg-custom-gray rounded-[26px] shadow-[0_8px_24px_rgba(0,0,0,0.2)] text-white hover:bg-gray-400 transition-colors pointer-events-auto"
        >
          <svg
            width="31"
            height="32"
            viewBox="0 0 31 32"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              opacity="0.4"
              d="M29.029 27.918H19.3013C18.3522 27.918 17.5803 28.7212 17.5803 29.7089C17.5803 30.6984 18.3522 31.4998 19.3013 31.4998H29.029C29.9781 31.4998 30.75 30.6984 30.75 29.7089C30.75 28.7212 29.9781 27.918 29.029 27.918Z"
              fill="white"
            />
            <path
              d="M12.4862 6.83156L21.7042 14.4617C21.9265 14.6442 21.9645 14.979 21.7909 15.2123L10.8629 29.7992C10.1759 30.7003 9.16353 31.2101 8.07885 31.2289L2.11314 31.3041C1.79497 31.3079 1.51657 31.0821 1.44426 30.7586L0.0884143 24.7199C-0.146599 23.61 0.0884143 22.4625 0.775375 21.5783L11.7577 6.92186C11.9349 6.68671 12.2621 6.64532 12.4862 6.83156Z"
              fill="white"
            />
            <path
              opacity="0.4"
              d="M25.831 9.91452L24.054 12.187C23.875 12.4184 23.5532 12.456 23.3308 12.2717C21.1705 10.4808 15.6387 5.88498 14.1039 4.61141C13.8797 4.42329 13.849 4.08843 14.0297 3.85516L15.7435 1.67485C17.2982 -0.375661 20.0099 -0.563781 22.1974 1.22336L24.7102 3.27387C25.7406 4.1016 26.4276 5.1927 26.6626 6.34023C26.9338 7.60252 26.6445 8.84223 25.831 9.91452Z"
              fill="white"
            />
          </svg>

          <span className="text-[16px] font-bold tracking-tight mt-2">
            등록
          </span>
        </Link>
      </div>
    </div>
  );
}
