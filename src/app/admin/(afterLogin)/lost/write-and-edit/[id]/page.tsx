import FormLayout from "../_components/FormLayout";
import { getLostItem } from "@/api/lost-items";
import { notFound } from "next/navigation";

export default async function LostEditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const data = await getLostItem(id);

  if (!data) {
    notFound();
  }

  return (
    <div>
      <FormLayout
        lostId={data.id}
        itemName={data.itemName}
        category={data.category}
        description={data.description || ""}
        imageUrls={data.imageUrls}
        foundLocation={data.foundLocation}
        foundTime={data.foundTime || ""}
        storageLocation={data.storageLocation || ""}
        status={data.status}
      />
    </div>
  );
}
