export default {
  name: 'handleInvite',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;invite.title]]
      $addActionRow
      $addButton[https://discord.com/oauth2/authorize?client_id=$clientID;$tl[$get[l];ui;invite.url];Link]
      $addButton[$getGlobalVar[discordServerInvite];$tl[$get[l];ui;invite.discord];Link]
      $addButton[https://top.gg/bot/$clientID;$tl[$get[l];ui;invite.topgg];Link]
    ;$getGlobalVar[defaultColor]]
  `
}