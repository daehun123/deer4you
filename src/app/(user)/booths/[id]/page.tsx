import {
  experienceList,
  externalCompanyList,
  schoolBoothList,
} from "@/data/festival";
import { notFound } from "next/navigation";
import {
  EXTERNAL_BOOTH_ID_OFFSET,
  SCHOOL_BOOTH_ID_OFFSET,
} from "../_data/boothData";
import FestivalBoothDetailView from "../_components/FestivalBoothDetailView";

export default async function BoothDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const n = Number(id);
  if (!Number.isFinite(n) || !Number.isInteger(n)) notFound();

  const externalItem = externalCompanyList.find(
    (b) => b.id + EXTERNAL_BOOTH_ID_OFFSET === n,
  );
  if (externalItem) {
    return (
      <FestivalBoothDetailView item={externalItem} categoryLabel="외부업체" />
    );
  }

  const schoolItem = schoolBoothList.find(
    (b) => b.id + SCHOOL_BOOTH_ID_OFFSET === n,
  );
  if (schoolItem) {
    return (
      <FestivalBoothDetailView item={schoolItem} categoryLabel="총학부스" />
    );
  }

  const festivalItem = experienceList.find((b) => b.id === n);
  if (festivalItem) {
    return (
      <FestivalBoothDetailView item={festivalItem} categoryLabel="체험 부스" />
    );
  }

  notFound();
}
