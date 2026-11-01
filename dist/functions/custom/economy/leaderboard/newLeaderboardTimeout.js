"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "newLeaderboardTimeout",
    description: "deletes the leaderboard msg and its pages after a while",
    brackets: false,
    params: [
        {
            name: "messageId",
            description: "the leaderboard msg (default: the interaction's msg)",
            type: forgescript_1.ArgType.String,
            required: false,
        },
    ],
    code: `
    $let[msgID;$default[$env[messageId];$messageID]]
    $!jsonDelete[messageId]
    $!clearTimeout[leaderboard-$authorID]
    $setTimeout[
      $deleteMessage[$channelID;$get[msgID]]
      $deleteMessageVar[LBlist;$get[msgID]]
    ;$getGlobalVar[leaderboard_cooldown];leaderboard-$authorID]
  `,
});
//# sourceMappingURL=newLeaderboardTimeout.js.map