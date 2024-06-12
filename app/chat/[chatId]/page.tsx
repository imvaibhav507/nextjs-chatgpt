"use client";
import Body from "@/components/Body";
import Header from "@/components/header";
import MessageBox from "@/components/MessageBox";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useRouter } from "next/navigation";
import React from "react";

interface ChatPageProps {
  params: {
    chatId: Id<"chats">;
  };
}
function Chat({ params }: ChatPageProps) {
  const chat = useQuery(api.chats.get, { id: params.chatId });

  const router = useRouter();

  // if (!chat) {
  //   router.push("/");
  // }

  return (
    <div className="bg-neutral-700 w-full flex flex-col">
      <Header />
      <div className="flex flex-col h-full w-full">
        <Body chatId={params.chatId} />
        <div className="w-full fixed bottom-5">
          <MessageBox chatId={params.chatId} />
        </div>
      </div>
    </div>
  );
}

export default Chat;
