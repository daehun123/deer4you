import FormLayout from "./_components/FormLayout";
import { getNoticeById } from "@/api/notice";

export default async function EditPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const Params = await params;
  const { id } = Params;

  const { data: notice } = await getNoticeById(id);

  if (!notice) {
    return <div>공지사항을 찾을 수 없습니다.</div>;
  }

  return (
    <div>
      <FormLayout
        initialTitle={notice.title}
        initialContent={notice.content}
        initialIsSticked={notice.pinned}
        noticeId={notice.id}
      />
    </div>
  );
}
