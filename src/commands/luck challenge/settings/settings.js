import settingsSnippets from "#snippets/settingsSnippets.js"
import universalSnippets from "#snippets/universalSnippets.js"

export default {
  name: "settings",
  aliases: ["sts"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({addCooldown: false})}

    ${settingsSnippets.settingsEmbed()}
    $let[msg;$sendMessage[$channelID;;true]]
    ${settingsSnippets.settingsTimeout()}
  `
}