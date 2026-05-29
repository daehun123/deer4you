import Cookies from "js-cookie";

const BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL || "";

let isRefreshing = false;

export async function adminFetch(endpoint: string, options: RequestInit = {}) {
  const token = Cookies.get("accessToken");

  const headers = new Headers(options.headers);
  if (!(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  if (token) {
    headers.set("Authorization", `Bearer ${token}`);
  }

  let response = await fetch(`${BASE_URL}${endpoint}`, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    const refreshToken = Cookies.get("refreshToken");

    if (!refreshToken) {
      logoutAndRedirect();
      throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
    }

    if (!isRefreshing) {
      isRefreshing = true;

      try {
        const refreshResponse = await fetch(`${BASE_URL}/auth/refresh`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ refreshToken }),
        });

        if (!refreshResponse.ok) {
          throw new Error("리프레시 토큰 만료");
        }

        const data = await refreshResponse.json();

        Cookies.set("accessToken", data.accessToken, {
          expires: 1,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
        });

        if (data.refreshToken) {
          Cookies.set("refreshToken", data.refreshToken, {
            expires: 7,
            secure: process.env.NODE_ENV === "production",
            sameSite: "strict",
          });
        }

        const newHeaders = new Headers(options.headers);
        if (!(options.body instanceof FormData)) {
          newHeaders.set("Content-Type", "application/json");
        }
        newHeaders.set("Authorization", `Bearer ${data.accessToken}`);

        response = await fetch(`${BASE_URL}${endpoint}`, {
          ...options,
          headers: newHeaders,
        });
      } catch (error) {
        logoutAndRedirect();
        throw new Error("인증이 만료되었습니다. 다시 로그인해주세요.");
      } finally {
        isRefreshing = false;
      }
    }
  }

  return response;
}

function logoutAndRedirect() {
  Cookies.remove("accessToken");
  Cookies.remove("refreshToken");
  if (typeof window !== "undefined") {
    window.location.href = "/admin/login?message=unauthorized";
  }
}
