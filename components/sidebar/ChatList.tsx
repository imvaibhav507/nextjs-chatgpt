"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";

function ChatList() {
  const chats = useQuery(api.chats.list);

  const { chatId } = useParams<{ chatId: Id<"chats"> }>();

  if (chats === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {chats.map((chat) => (
        <div key={chat._id} className="text-white">
          {" "}
          {chat.title}
        </div>
      ))}
    </div>
  );
}

export default ChatList;
