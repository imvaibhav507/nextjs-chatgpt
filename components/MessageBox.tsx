import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useAction, useQuery } from "convex/react";
import React, { useState } from "react";
import { Input } from "./ui/input";

interface MessageBoxProps {
  chatId: Id<"chats">;
}
function MessageBox({ chatId }: MessageBoxProps) {
  const chat = useQuery(api.chats.get, { id: chatId });
  const sendMessage = useAction(api.messages.submit);

  const [message, setMessage] = useState<string>("");

  if (chat == undefined || !chat) {
    return <div>Chat not found !</div>;
  }

  const handleSendMessage = async () => {
    if (message === "") return;

    const temp = message;
    setMessage("");
    await sendMessage({
      role: "user",
      content: temp,
      chatId: chat._id,
    });
  };
  const handleClickDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      handleSendMessage();
    }
  };
  return (
    <div
      className="relative sm:px-40 md:px-52 lg:px-80 2xl:px-96
  w-full mx-auto"
    >
      <Input
        placeholder="Message ChatGPT..."
        className=" border-[1px] border-neutral-500 ring-0 rounded-xl bg-inherit 
      text-neutral-200 placeholder:text-neutral-400 h-12"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        onKeyDown={handleClickDown}
      />
    </div>
  );
}

export default MessageBox;
