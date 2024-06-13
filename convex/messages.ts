import { v } from "convex/values";
import {
  action,
  internalMutation,
  internalQuery,
  query,
} from "./_generated/server";
import { api, internal } from "./_generated/api";
import OpenAI from "openai";

export const send = internalMutation({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const newMessageId = await ctx.db.insert("messages", {
      role: args.role,
      content: args.content,
      chatId: args.chatId,
    });

    return newMessageId;
  },
});

export const retrieve = internalQuery({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    const messages = await ctx.db
      .query("messages")
      .withIndex("by_chat_id", (q) => q.eq("chatId", args.chatId))
      .order("desc")
      .take(3);

    return messages;
  },
});

export const submit = action({
  args: {
    role: v.union(v.literal("user"), v.literal("assistant")),
    content: v.string(),
    chatId: v.id("chats"),
  },
  handler: async (ctx, args) => {
    const user = await ctx.runQuery(api.users.currentUser, {});

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.runMutation(internal.messages.send, {
      role: args.role,
      content: args.content,
      chatId: args.chatId,
    });

    const messages = await ctx.runQuery(internal.messages.retrieve, {
      chatId: args.chatId,
    });

    messages.reverse();

    const formattedMessages = messages.map((message) => ({
      role: message.role,
      content: message.content,
    }));

    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    let response = "";
    const stream = await openai.chat.completions.create({
      model: user.model,
      stream: true,
      messages: formattedMessages,
      temperature: 1,
      max_tokens: 420,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
    });

    const newAssitantMessageId = await ctx.runMutation(internal.messages.send, {
      role: "assistant",
      content: "",
      chatId: args.chatId,
    });

    for await (const part of stream) {
      if (part.choices[0].delta.content === null) {
        throw new Error("OpenAI completion is null");
      }
      if (part.choices[0].delta.content !== undefined) {
        response += part.choices[0].delta.content;

        await ctx.runMutation(internal.messages.update, {
          messageId: newAssitantMessageId,
          content: response,
        });
      }
    }
  },
});

export const list = query({
  args: { chatId: v.id("chats") },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("messages")
      .withIndex("by_chat_id", (q) => q.eq("chatId", args.chatId))
      .collect();
  },
});

export const update = internalMutation({
  args: { messageId: v.id("messages"), content: v.string() },
  handler: async (ctx, args) => {
    await ctx.db.patch(args.messageId, {
      content: args.content,
    });
  },
});
