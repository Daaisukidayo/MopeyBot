import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "settingsChangedInfo",
  description: "Displays a lobby settings changed notification.",
  params: [
    {
      name: "content",
      description: "The content to display in the notification.",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $addContainer[
      $addTextDisplay[$tl[ui.lobby.settingsChange.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$env[content]]
    ;$getGlobalVar[luckyColor]]
    $let[messageId;$sendMessage[$channelID;;true]]
    $setTimeout[
      $!deleteMessage[$channelID;$get[messageId]]
    ;10s]
  `,
})
