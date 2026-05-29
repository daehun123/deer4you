import { apiFetchJson } from "./client";
import { adminFetch } from "./admin/client";

export type EventApiItem = {
  id: number;
  title: string;
  description: string | null;
  startTime: string; // ISO
  endTime: string; // ISO
  location: string;
  imageUrls: string[];
  createdAt: string;
};

export type EventApiDetailItem = EventApiItem & {
  content: string | null;
  contentType?: string;
  productDescription?: string | null;
  caution: string | null;
  contentImageUrls?: string[];
  updatedAt: string;
};

export async function getEvents(options?: { revalidate?: number }) {
  const res = await apiFetchJson<EventApiItem[]>("/events", {
    revalidate: options?.revalidate ?? 300,
  });
  if (!res.ok) throw new Error(`이벤트 목록 조회 실패 (${res.status})`);

  return [...(res.data ?? [])].reverse();
}

export async function getEvent(id: string, options?: { revalidate?: number }) {
  const res = await apiFetchJson<EventApiDetailItem>(`/events/${id}`, {
    revalidate: options?.revalidate ?? 300,
  });

  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`이벤트 상세 조회 실패 (${res.status})`);

  return res.data;
}

export async function createEvent(formData: FormData) {
  const response = await adminFetch("/admin/events", {
    method: "POST",
    body: formData,
  });

  if (!response.ok) {
    const errorText = await response.text();
    console.error("서버 에러 상세 내용:", errorText);
    throw new Error(`이벤트 생성 실패 (${response.status}) - ${errorText}`);
  }

  return response.json();
}

export async function updateEvent(id: string, formData: FormData) {
  const response = await adminFetch(`/admin/events/${id}`, {
    method: "PATCH",
    body: formData,
  });
  if (process.env.NODE_ENV !== "production") {
    console.log(`[events] update response for id ${id}:`, response.status);
  }
  if (!response.ok) {
    const errorText = await response.text();
    console.error("서버 에러 상세 내용:", errorText);
    throw new Error(`이벤트 수정 실패 (${response.status}) - ${errorText}`);
  }

  return response.json();
}

export async function deleteEvent(id: string) {
  const response = await adminFetch(`/admin/events/${id}`, {
    method: "DELETE",
  });
  if (!response.ok) {
    const errorText = await response.text();
    console.error("서버 에러 상세 내용:", errorText);
    throw new Error(`이벤트 삭제 실패 (${response.status}) - ${errorText}`);
  }
}
