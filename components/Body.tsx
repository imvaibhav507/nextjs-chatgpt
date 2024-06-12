import { Id } from "@/convex/_generated/dataModel";
import React from "react";

interface BodyProps {
  chatId: Id<"chats">;
}

function Body({ chatId }: BodyProps) {
  return <div>Body</div>;
}

export default Body;
