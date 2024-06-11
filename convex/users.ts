import { mutation } from "./_generated/server";

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
