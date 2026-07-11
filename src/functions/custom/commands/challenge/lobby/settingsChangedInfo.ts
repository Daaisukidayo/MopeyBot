import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'settingsChangedInfo',
  description: "Displays a lobby settings changed notification.",
  params: [
    {
      name: "_content",
      description: "The content to display in the notification.",
      type: ArgType.String,
    }
  ],
  code: `
    $let[l;$env[userProfile;language]]
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsChange.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$env[_content]]
    ;$getGlobalVar[luckyColor]]
    $let[messageId;$sendMessage[$channelID;;true]]
    $setTimeout[
      $!deleteMessage[$channelID;$get[messageId]]
    ;10s]
  `
})