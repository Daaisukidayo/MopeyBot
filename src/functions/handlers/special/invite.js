export default {
  name: 'handleInvite',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.invite.title]]
      $addActionRow
      $addButton[https://discord.com/oauth2/authorize?client_id=$clientID;$tl[ui.invite.url];Link]
      $addButton[$getGlobalVar[discordServerInvite];$tl[ui.invite.discord];Link]
      $addButton[https://top.gg/bot/$clientID;$tl[ui.invite.topgg];Link]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}