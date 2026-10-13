"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "messageCreate",
    guildOnly: true,
    code: `
    $let[id;$botID]
    $onlyIf[$messageContent==<@$get[id]>]
    $reply
    $tl[ui.prefix.current.$jsonGet[$getProfile;language];<@$authorID>;$hyperlink[$username[$get[id]];<https://discord.com/discovery/applications/$get[id]>];$getGuildVar[prefix]]
  `
});
//# sourceMappingURL=botMentioned.js.map