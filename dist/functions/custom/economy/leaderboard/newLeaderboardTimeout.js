"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newLeaderboardTimeout",
    description: "Deletes the leaderboard message and its pages after a while.",
    brackets: false,
    params: [
        {
            name: "messageId",
            description: "The leaderboard message (default: the message of the interaction).",
            type: forgescript_1.ArgType.String,
            required: false
        }
    ],
    code: `
    $let[msgID;$default[$env[messageId];$messageID]]
    $!jsonDelete[messageId]
    $!clearTimeout[leaderboard-$authorID]
    $setTimeout[
      $deleteMessage[$channelID;$get[msgID]]
      $deleteMessageVar[LBlist;$get[msgID]]
    ;$getGlobalVar[leaderboard_cooldown];leaderboard-$authorID]
  `
});
//# sourceMappingURL=newLeaderboardTimeout.js.map