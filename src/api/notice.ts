import { apiFetchJson } from "./client";
import { adminFetch } from "./admin/client";

export interface Notice {
  id: number;
  title: string;
  content: string;
  pinned: boolean;
  createdAt: string;
}

export async function getNotices(search?: string) {
  const url = search
    ? `/notices?search=${encodeURIComponent(search)}`
    : "/notices";
  return await apiFetchJson<Notice[]>(url, { cache: "no-store" });
}

export async function getNoticeById(id: string | number) {
  return await apiFetchJson<Notice>(`/notices/${id}`, { cache: "no-store" });
}

export async function toggleNoticePin(id: string | number) {
  const response = await adminFetch(`/admin/notices/${id}/pin`, {
    method: "PATCH",
  });
  return response.ok;
}

export async function deleteNotice(id: string | number) {
  const response = await adminFetch(`/admin/notices/${id}`, {
    method: "DELETE",
  });
  return response.ok;
}
