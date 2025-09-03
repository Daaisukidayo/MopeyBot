import settingsEmbed from "../../../JSfunctions/settings/embed.js"
import settingsTimeout from "../../../JSfunctions/settings/timeout.js"

export default {
  name: "settings",
  aliases: ["sts"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getUserVar[userProfile]]
    $callFunction[checking]

    ${settingsEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]
    ${settingsTimeout()}
  `
}