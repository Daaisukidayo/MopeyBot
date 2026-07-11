import { BaseCommand } from "@tryforge/forgescript";

export default new BaseCommand({
  type: "messageCreate",
  guildOnly: true,
  code: `
    $let[id;$botID]
    $onlyIf[$messageContent==<@$get[id]>]
    $reply
    $let[prefix;$getGuildVar[prefix]]
    $tl[ui.prefix.current.$env[$getProfile;language];<@$authorID>;$hyperlink[$username[$get[id]];<https://discord.com/discovery/applications/$get[id]>];$get[prefix]]
  `
})