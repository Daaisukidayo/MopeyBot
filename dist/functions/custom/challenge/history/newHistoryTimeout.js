"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newHistoryTimeout",
    description: "Deletes the history message and what is kept for it after a while.",
    brackets: false,
    params: [
        {
            name: "messageId",
            description: "The history message (default: the message of the interaction).",
            type: forgescript_1.ArgType.String,
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
});
//# sourceMappingURL=newHistoryTimeout.js.map