import { v } from "convex/values";
import { action } from "./_generated/server";

export const send = action({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {},
});
