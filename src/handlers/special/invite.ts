import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleInvite",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.invite.title.$get[l]]]
      $addActionRow
      $addButton[https://discord.com/oauth2/authorize?client_id=$clientID;$tl[ui.invite.url.$get[l]];Link]
      $addButton[$getGlobalVar[discordServerInvite];$tl[ui.invite.discord.$get[l]];Link]
      $addButton[https://top.gg/bot/$clientID;$tl[ui.invite.topgg.$get[l]];Link]
    ;$getGlobalVar[defaultColor]]
  `,
})
