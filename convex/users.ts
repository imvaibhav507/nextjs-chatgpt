import { mutation, query } from "./_generated/server";
import { v } from "convex/values";
export const create = mutation({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not logged in");
    }

    // check if user already exist
    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier)
      )
      .unique();

    if (user !== null) {
      return user._id;
    }

    const userId = await ctx.db.insert("users", {
      tokenIdentifier: userIdentity.tokenIdentifier,
      model: "gpt-3.5-turbo-0125",
    });

    await ctx.db.insert("chats", {
      userId,
      title: "New Chat",
    });

    return userId;
  },
});

export const selectGPT = mutation({
  args: {
    model: v.union(v.literal("gpt-3.5-turbo-0125"), v.literal("gpt-4-turbo")),
  },
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not logged in");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw new Error("User not found");
    }

    await ctx.db.patch(user._id, {
      model: args.model,
    });

    return user._id;
  },
});

export const currentUser = query({
  args: {},
  handler: async (ctx) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("User not logged in");
    }

    return await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier)
      )
      .unique();
  },
});
