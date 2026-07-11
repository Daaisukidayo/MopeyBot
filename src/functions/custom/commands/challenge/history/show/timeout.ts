import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'newHistoryTimeout',
  code: `
    $let[mid;$nullish[$get[mid];$messageID]]
    $!stopAdvancedTimeout[showhistory-$authorID]
    $!advancedTimeout[$esc[
      $deleteMessageVar[cachedHistory;{messageId}]
      $deleteMessageVar[cachedThisHistory;{messageId}]
      $!deleteMessage[{channelId};{messageId}]
    ];$getGlobalVar[showhistory_cooldown];showhistory-$authorID;{"messageId": "$get[mid]", "channelId": "$channelID"}]
  `
})