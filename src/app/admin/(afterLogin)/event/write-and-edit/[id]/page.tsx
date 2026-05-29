import React from "react";
import FormLayout from "../_components/FormLayout";
import { getEvent } from "@/api/events";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const event = await getEvent(id, { revalidate: 0 });

  if (!event) {
    return <div className="p-4">이벤트를 찾을 수 없습니다.</div>;
  }

  const formatDateTime = (isoString: string) => {
    if (!isoString) return "";
    return isoString.substring(0, 16);
  };

  return (
    <div className="p-4">
      <FormLayout
        eventId={id}
        title={event.title}
        startDate={formatDateTime(event.startTime)}
        endDate={formatDateTime(event.endTime)}
        location={event.location}
        description={event.description || ""}
        method={event.content || ""}
        prizeText={event.productDescription || ""}
        prizeImageUrl={
          event.contentImageUrls && event.contentImageUrls.length > 0
            ? event.contentImageUrls[0]
            : undefined
        }
        mainImageUrl={
          event.imageUrls && event.imageUrls.length > 0
            ? event.imageUrls[0]
            : undefined
        }
      />
    </div>
  );
}
