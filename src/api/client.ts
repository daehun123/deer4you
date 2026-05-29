type ApiFetchOptions = Omit<RequestInit, "headers"> & {
  headers?: Record<string, string>;
  revalidate?: number;
};

function getApiBaseUrl() {
  const base = process.env.NEXT_PUBLIC_API_BASE_URL?.trim();
  if (!base) throw new Error("NEXT_PUBLIC_API_BASE_URL가 설정되어 있지 않습니다.");
  return base.replace(/\/+$/, "");
}

export async function apiFetchJson<T>(
  path: string,
  { revalidate, headers, ...init }: ApiFetchOptions = {},
): Promise<{ status: number; ok: boolean; data: T | null }> {
  const isServer = typeof window === "undefined";
  const res = await fetch(`${getApiBaseUrl()}${path}`, {
    ...init,
    headers: {
      Accept: "application/json",
      ...headers,
    },
    ...(isServer && typeof revalidate === "number"
      ? { next: { revalidate } }
      : {}),
  });

  let data: T | null = null;
  try {
    data = (await res.json()) as T;
  } catch {
    data = null;
  }

  return { status: res.status, ok: res.ok, data };
}

