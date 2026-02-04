export default {
  name: "invite",
  aliases: ["inv"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.$commandName.title]]
      $addActionRow
      $addButton[https://discord.com/oauth2/authorize?client_id=$clientID;$tl[ui.$commandName.url];Link]
      $addButton[$getGlobalVar[discordServerInvite];$tl[ui.$commandName.discord];Link]
      $addButton[https://top.gg/bot/$clientID;$tl[ui.$commandName.topgg];Link]
    ;$getGlobalVar[defaultColor]]
  `
}
