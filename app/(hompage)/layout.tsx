import Sidebar from "../../components/sidebar";

interface ChatLayoutProps {
  children: React.ReactNode;
}

export default function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="flex h-full bg-neutral-700">
      <Sidebar />
      <div className="flex h-full w-full">{children}</div>
    </main>
  );
}
