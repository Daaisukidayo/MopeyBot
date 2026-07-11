import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'newLeaderboardTimeout',
  code: `
    $!stopAdvancedTimeout[leaderboard-$authorID]
    $!advancedTimeout[$esc[
      $!deleteMessage[{channel};{message}]
      $!deleteMessageVar[LBpages;{message}]
    ];$getGlobalVar[leaderboard_cooldown];leaderboard-$authorID;{"channel": "$channelID", "message": "$get[msgID]"}]
  `
})