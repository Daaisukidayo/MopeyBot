import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "newLeaderboardTimeout",
  description: "Deletes the leaderboard message and its pages after a while.",
  brackets: false,
  params: [
    {
      name: "messageId",
      description: "The leaderboard message (default: the message of the interaction).",
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
