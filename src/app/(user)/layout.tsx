import Header from "@/components/Header";
import BottomNavBar from "@/components/navbar/BottomNavBar";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto flex min-h-screen max-w-md flex-col bg-white shadow-lg relative">
      <Header />
      <main className="flex-1 overflow-y-auto pb-16">{children}</main>
      <BottomNavBar />
    </div>
  );
}
