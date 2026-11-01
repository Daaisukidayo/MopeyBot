import { ArgType, Logger, NativeFunction } from "@tryforge/forgescript"
import { resolveNumericEnum } from "@tryforge/forgescript/dist/functions/enum.js"
import { Routes } from "discord.js"

export enum NicknameFonts {
  Bangers = 1,
  BioRhyme = 2,
  CherryBomb = 3,
  Chicle = 4,
  Compagnon = 5,
  MuseoModerno = 6,
  NeoCastel = 7,
  PixelifySans = 8,
  Ribes = 9,
  Sinistre = 10,
  Default = 11,
  ZillaSlab = 12,
}

export enum NicknameEffects {
  Solid = 1,
  Gradient = 2,
  Neon = 3,
  Toon = 4,
  Pop = 5,
  Glow = 6,
}

export default new NativeFunction({
  name: "$setBotNicknameStyle",
  description: "sets the bot's display name style in a guild, returns a bool",
  aliases: ["$setClientNicknameStyle"],
  unwrap: true,
  brackets: true,
  output: ArgType.Boolean,
  args: [
    {
      name: "guild ID",
      description: "the guild to set it in",
      required: false,
      rest: false,
      type: ArgType.Guild,
    },
    {
      name: "font",
      description: "the display name font",
      required: true,
      rest: false,
      type: ArgType.Enum,
      enum: NicknameFonts,
    },
    {
      name: "effect",
      description: "the display name effect",
      required: true,
      rest: false,
      type: ArgType.Enum,
      enum: NicknameEffects,
    },
    {
      name: "colors",
      description: "one or more display name colors",
      rest: true,
      type: ArgType.Color,
    },
  ],
  async execute(ctx, [guild, font, effect, colors]) {
    const res = await ctx.client.rest
      .patch(Routes.guildMember((guild || ctx.guild!).id), {
        body: {
          display_name_font_id: resolveNumericEnum(NicknameFonts, font),
          display_name_effect_id: resolveNumericEnum(NicknameEffects, effect),
          display_name_colors: colors,
        },
      })
      .catch((e) => Logger.error(e))

    return this.success(Boolean(res))
  },
})
