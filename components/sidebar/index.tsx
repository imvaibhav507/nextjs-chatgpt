import React from "react";
import NewChatButton from "./NewChatButton";
import ChatList from "./ChatList";

function Sidebar() {
  return (
    <div className="h-full w-[300px] lg:flex lg:flex-col lg:w-[300px] p-4 bg-neutral-900">
      <NewChatButton />
      <ChatList />
      Upgradeplan
    </div>
  );
}

export default Sidebar;
