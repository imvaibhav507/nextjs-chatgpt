"use client";
import React from "react";
import { Button } from "../ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
import { useRouter } from "next/navigation";
function NewChatButton() {
  const create = useMutation(api.chats.create);
  const router = useRouter();
  const handleCreateChat = async () => {
    const chatId = await create();
    router.push(`/chat/${chatId}`);
  };
  return (
    <Button
      className="w-full justify-between items-center px-5 hover:bg-slate-800"
      onClick={handleCreateChat}
    >
      <PlusCircle />
      <p>New Chat</p>
      <SquarePen />
    </Button>
  );
}

export default NewChatButton;
