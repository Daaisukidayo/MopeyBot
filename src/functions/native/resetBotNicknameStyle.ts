import { ArgType, Logger, NativeFunction } from "@tryforge/forgescript"
import { Routes } from "discord.js"

export default new NativeFunction({
  name: "$resetBotNicknameStyle",
  description: "resets the bot's display name style in a guild, returns a bool",
  aliases: ["$resetClientNicknameStyle", "$resetBotDisplayNameStyle", "$resetClientDisplayNameStyle"],
  unwrap: true,
  brackets: false,
  output: ArgType.Boolean,
  args: [
    {
      name: "guild ID",
      description: "the guild to reset it in",
      rest: false,
      type: ArgType.Guild,
    },
  ],
  execute: async function (ctx, [guild]) {
    const res = await ctx.client.rest
      .patch(Routes.guildMember((guild || ctx.guild!).id), {
        body: {
          display_name_font_id: null,
          display_name_effect_id: null,
          display_name_colors: null,
        },
      })
      .catch((e) => Logger.error(e))

    return this.success(Boolean(res))
  },
})
