import { api } from "@/convex/_generated/api";
import { Id } from "@/convex/_generated/dataModel";
import { useUser } from "@clerk/clerk-react";
import { useQuery } from "convex/react";
import React, { useEffect, useRef, useState } from "react";
import { ScrollArea } from "./ui/scroll-area";
import Message from "./Message";

interface BodyProps {
  chatId: Id<"chats">;
}

function Body({ chatId }: BodyProps) {
  const messages = useQuery(api.messages.list, { chatId: chatId }) || [];
  const user = useUser();
  const scrollRef = useRef<HTMLDivElement>(null);
  const [showButton, setShowButton] = useState(false);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "auto" });
    }
  };

  return (
    <>
      <ScrollArea className="max-h-[calc(100%-150px)] h-full w-full flex-1">
        <div className="px-4 sm:px-12 md:px-52 2xl:px-[430px] relative">
          {messages.map((message) => (
            <Message
              key={message._id}
              message={message}
              profileUrl={user.user!.imageUrl}
            />
          ))}
        </div>
        <div ref={scrollRef} />
      </ScrollArea>
    </>
  );
}

export default Body;
