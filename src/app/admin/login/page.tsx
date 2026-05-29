"use client";
import { useRouter, useSearchParams } from "next/navigation";
import React, { useEffect, Suspense } from "react";
import Cookies from "js-cookie";

function LoginForm() {
  const router = useRouter();
  const [error, setError] = React.useState<string | null>(null);
  const searchParams = useSearchParams();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

    if (!email || !password) {
      setError("이메일과 비밀번호를 모두 입력해주세요.");
      return;
    }

    try {
      const response = await fetch(`${BASE_URL}/auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (response.ok) {
        // 로그인 성공 시, 토큰을 쿠키에 저장
        const data = await response.json();
        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        Cookies.set("refreshToken", data.refreshToken, {
          expires: 7,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });
        alert("로그인 성공!");
        if (process.env.NODE_ENV === "development") {
          console.log("발급된 토큰:", data.accessToken);
          console.log("쿠키에 저장된 토큰:", Cookies.get("accessToken"));
          console.log(
            "쿠키에 저장된 리프레시 토큰:",
            Cookies.get("refreshToken"),
          );
        }
        router.push("/admin");
      } else if (response.status === 401) {
        setError(
          "입력한 아이디 혹은 비밀번호가 올바르지 않습니다. 다시 시도하세요.",
        );
      } else if (response.status === 423) {
        setError(
          "5회 입력 실패로 10분간 계정이 잠겼습니다. 잠시 후 다시 시도해주세요.",
        );
      }
    } catch (error) {
      console.error("로그인 중 오류 발생:", error);
      setError("로그인 중 오류가 발생했습니다. 다시 시도해주세요.");
    }
  };

  useEffect(() => {
    if (searchParams.get("message") === "unauthorized") {
      alert("로그인이 필요한 페이지입니다. 로그인 후 이용해주세요.");
      window.history.replaceState(null, "", "/admin/login");
    }
  }, [searchParams]);

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto mt-6 w-full max-w-sm rounded-lg bg-white p-6 shadow-md"
    >
      <div className="flex flex-col gap-2">
        <p className="text-sm font-semibold">이메일</p>
        <input
          type="email"
          name="email"
          className="bg-custom-lightgray rounded-md p-2"
        />
        <p className="text-sm font-semibold">비밀번호</p>
        <input
          type="password"
          name="password"
          className="bg-custom-lightgray rounded-md p-2"
        />
        {error && <p className="text-sm text-red-500 font-semibold">{error}</p>}
      </div>

      <button
        type="submit"
        className="bg-[#0B89FF] text-white font-bold rounded-lg p-2 mt-10 w-full hover:bg-blue-400 transition-colors"
      >
        로그인
      </button>
    </form>
  );
}

export default function LoginPage() {
  return (
    <Suspense fallback={<div className="text-center mt-10">로딩 중...</div>}>
      <LoginForm />
    </Suspense>
  );
}
