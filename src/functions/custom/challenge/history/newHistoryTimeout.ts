import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newHistoryTimeout",
  description: "deletes the history message and its cached data after a while",
  brackets: false,
  params: [
    {
      name: "messageId",
      description: "the history message (default: the interaction's message)",
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
