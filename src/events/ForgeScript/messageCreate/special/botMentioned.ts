export default {
  type: "messageCreate",
  guildOnly: true,
  code: `
    $onlyIf[$messageContent==<@$botID>]
    $reply
    $let[prefix;$getGuildVar[prefix]]
    ## Hi, <@$authorID>! I am $hyperlink[$username[$botID];<https://discord.com/discovery/applications/$botID>]! My prefix here is $inline[$get[prefix]]
  `
}