import { api } from "@/convex/_generated/api";
import { Doc } from "@/convex/_generated/dataModel";
import { cn } from "@/lib/utils";
import { useMutation } from "convex/react";
import { Ellipsis, Pencil, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface ChatListItemProps {
  chat: Doc<"chats">;
  isSelected: boolean;
}

function ChatListItem({ chat, isSelected }: ChatListItemProps) {
  const rename = useMutation(api.chats.rename);
  const remove = useMutation(api.chats.remove);

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(chat.title);

  const router = useRouter();

  const handleClick = () => {
    if (!isSelected) {
      router.push(`/chat/${chat._id}`);
    }
  };

  const handleRename = () => {
    rename({ id: chat._id, title: title });
    setIsEditing(false);
  };

  const handleRemove = () => {
    remove({ id: chat._id });
    router.push("/");
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      handleRename();
    }
  };

  return (
    <div
      className={cn(
        "group relative flex w-full justify-between p-2 rounded-md hover:bg-neutral-700 cursor-pointer text-white text-sm",
        isSelected && "bg-neutral-700"
      )}
      onClick={handleClick}
    >
      {isEditing ? (
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          autoFocus
          onKeyDown={handleKeyDown}
          className="outline-none bg-transparent w-[170px]"
        />
      ) : (
        <div className="truncate max-w-[200px]"> {chat.title}</div>
      )}
      <DropdownMenu>
        <DropdownMenuTrigger>
          <Ellipsis className="size-4" />
        </DropdownMenuTrigger>
        <DropdownMenuContent side="right">
          <DropdownMenuSeparator />
          <DropdownMenuItem>
            <button
              onClick={() => setIsEditing(true)}
              className="flex flex-row w-full justify-evenly text-sm"
            >
              <Pencil className="size-4" />
              <div>Rename</div>
            </button>
          </DropdownMenuItem>
          <DropdownMenuItem>
            <button
              onClick={handleRemove}
              className="flex flex-row w-full justify-evenly text-red-400 text-sm"
            >
              <Trash className="size-4" />
              <div>Delete</div>
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}

export default ChatListItem;
