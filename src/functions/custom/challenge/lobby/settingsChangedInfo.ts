import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "settingsChangedInfo",
  description: "a 'lobby settings changed' notice",
  params: [
    {
      name: "content",
      description: "the notice text",
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
