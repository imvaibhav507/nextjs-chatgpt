import Sidebar from "@/components/sidebar";
import React from "react";

interface ChatLayoutProps {
  children: React.ReactNode;
}

function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <main className="flex h-full bg-neutral-400">
      <Sidebar />
      <div className="flex h-full w-full">{children}</div>
    </main>
  );
}

export default ChatLayout;
