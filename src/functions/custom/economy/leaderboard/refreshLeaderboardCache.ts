import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "refreshLeaderboardCache",
  description: "Rebuilds the cached leaderboard, sorted by coins",
  code: `
    $arrayMap[$getGlobalVar[allUserIDs];id;
      $jsonLoad[profile;$getProfile[$env[id]]]
      $return[$objectPick[profile;MC;ID;MUID]]
    ;profiles]

    $arrayMap[$arraySortBy[profiles;desc;MC];elem;
      $!jsonSet[elem;pos;$math[$env[i] + 1]]
      $return[$env[elem]]
    ;cachedLB;i]

    $setCache[leaderboard;cachedLB;$env[cachedLB]]
  `,
})
