import uniSnippets from "#snippets/universalSnippets.js";

export default {
  name: "math",
  type: "messageCreate",
  code: `
    $reply
    ${uniSnippets.checkProfile({addCooldown: false})}
    $math[$message]
  `
}