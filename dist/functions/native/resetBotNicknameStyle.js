"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const discord_js_1 = require("discord.js");
exports.default = new forgescript_1.NativeFunction({
    name: "$resetBotNicknameStyle",
    description: "Resets the bot's display name style for the specified guild, returns bool",
    aliases: ["$resetClientNicknameStyle", "$resetBotDisplayNameStyle", "$resetClientDisplayNameStyle"],
    unwrap: true,
    brackets: false,
    output: forgescript_1.ArgType.Boolean,
    args: [
        {
            name: "guild ID",
            description: "The guild whose bot display name style should be reset",
            rest: false,
            type: forgescript_1.ArgType.Guild
        }
    ],
    execute: async function (ctx, [guild]) {
        const res = await ctx.client.rest
            .patch(discord_js_1.Routes.guildMember((guild || ctx.guild).id), {
            body: {
                display_name_font_id: null,
                display_name_effect_id: null,
                display_name_colors: null
            }
        })
            .catch((e) => forgescript_1.Logger.error(e));
        return this.success(Boolean(res));
    }
});
//# sourceMappingURL=resetBotNicknameStyle.js.map