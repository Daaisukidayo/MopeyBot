import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newLeaderboardTimeout",
  description: "deletes the leaderboard msg and its pages after a while",
  brackets: false,
  params: [
    {
      name: "messageId",
      description: "the leaderboard msg (default: the interaction's msg)",
      type: ArgType.String,
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
})
