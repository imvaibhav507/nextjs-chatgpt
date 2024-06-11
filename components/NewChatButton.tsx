"use client";
import React from "react";
import { Button } from "./ui/button";
import { PlusCircle, SquarePen } from "lucide-react";
import { api } from "@/convex/_generated/api";
import { useMutation } from "convex/react";
function NewChatButton() {
  const create = useMutation(api.chats.create);

  const handleCreateChat = () => {
    create({});
  };
  return (
    <Button
      className="w-full items-center justify-between px-4 hover:bg-slate-800"
      onClick={handleCreateChat}
    >
      <PlusCircle />
      <p>New Chat</p>
      <SquarePen />
    </Button>
  );
}

export default NewChatButton;
