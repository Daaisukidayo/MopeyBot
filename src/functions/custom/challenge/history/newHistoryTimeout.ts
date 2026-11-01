import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newHistoryTimeout",
  description: "deletes the history msg and its cached stuff after a while",
  brackets: false,
  params: [
    {
      name: "messageId",
      description: "the history msg (default: the interaction's msg)",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $let[mid;$default[$env[messageId];$messageID]]
    $!jsonDelete[messageId]
    $!clearTimeout[showhistory-$authorID]
    $setTimeout[
      $deleteMessageVar[cachedHistory;$get[mid]]
      $deleteMessageVar[cachedThisHistory;$get[mid]]
      $deleteMessageVar[cachedHistoryPageIndex;$get[mid]]
      $deleteMessage[$channelID;$get[mid]]
    ;$getGlobalVar[showhistory_cooldown];showhistory-$authorID]
  `,
})
