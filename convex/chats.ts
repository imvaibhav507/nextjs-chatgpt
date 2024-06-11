import { mutation } from "./_generated/server";

export const create = mutation({
  args: {},
  handler: async (ctx, args) => {
    const userIdentity = await ctx.auth.getUserIdentity();
    if (!userIdentity) {
      throw new Error("called create chat without logged in user");
    }

    const user = await ctx.db
      .query("users")
      .withIndex("by_token", (q) =>
        q.eq("tokenIdentifier", userIdentity.tokenIdentifier)
      )
      .unique();

    if (!user) {
      throw Error("User not found!");
    }

    const chatId = await ctx.db.insert("chats", {
      userId: user._id,
      title: "New chat",
    });

    return chatId;
  },
});
