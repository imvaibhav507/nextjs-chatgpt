import { Doc } from "@/convex/_generated/dataModel";
import React from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import CustomMarkdown from "./CustomMarkdown";

interface MessageProps {
  message: Doc<"messages">;
  profileUrl: string | null;
}
function Message({ message, profileUrl }: MessageProps) {
  const sender = message.role === "user" ? "You" : "Vortex";
  const avatar = message.role === "user" ? profileUrl : "/logo.svg";
  return (
    <div
      className="flex space-x-3 items-start 
    mb-10 max-w-[calc(80%)] md:max-w-full text-wrap"
    >
      <Avatar>
        <AvatarImage src={avatar!} />
        <AvatarFallback className="text-neutral-900 font-semibold">
          {sender[0]}
        </AvatarFallback>
      </Avatar>
      <div className="max-w-[cal(80%)]">
        <h3 className="font-bold">{sender}</h3>
        <div className="text-white">
          <CustomMarkdown content={message.content} />
        </div>
      </div>
    </div>
  );
}

export default Message;
