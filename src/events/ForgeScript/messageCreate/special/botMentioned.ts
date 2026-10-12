import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "messageCreate",
  guildOnly: true,
  code: `
    $let[id;$botID]
    $onlyIf[$messageContent==<@$get[id]>]
    $reply
    $tl[ui.prefix.current.$jsonGet[$getProfile;language];<@$authorID>;$hyperlink[$username[$get[id]];<https://discord.com/discovery/applications/$get[id]>];$getGuildVar[prefix]]
  `
})
