import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newHistoryTimeout",
  description: "Deletes the history message and what is kept for it after a while.",
  brackets: false,
  params: [
    {
      name: "messageId",
      description: "The history message (default: the message of the interaction).",
      type: ArgType.String,
      required: false
    }
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
  `
})
