"use client";
import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useQuery } from "convex/react";
import { useParams } from "next/navigation";
import React from "react";
import ChatListItem from "./ChatListItem";

function ChatList() {
  const chats = useQuery(api.chats.list);

  const { chatId } = useParams<{ chatId: Id<"chats"> }>();

  if (chats === undefined) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {chats.map((chat) => (
        <ChatListItem
          key={chat._id}
          chat={chat}
          isSelected={chatId === chat._id}
        />
      ))}
    </div>
  );
}

export default ChatList;
