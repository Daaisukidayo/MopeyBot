import universalSnippets from '#snippets/universalSnippets.js'

export default {
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $reply
    ${universalSnippets.checkProfile({time: '1m'})}

    $let[lbplace;$getGlobalVar[cachedLB]]

    $if[$get[lbplace]==;$let[lbplace;Leaderboard is not loaded yet! Check later!]]

    $description[**$trimEnd[$get[lbplace]]**]
    $color[$getGlobalVar[defaultColor]]
    $author[🔝 Leaderboard]
    $thumbnail[https://cdn.discordapp.com/attachments/701793335941136464/1326901475464450100/Remove-bg.ai_1736428344912.png]
  `
}