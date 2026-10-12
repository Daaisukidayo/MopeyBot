import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $refreshLeaderboardCache

    $setInterval[$refreshLeaderboardCache;5m]
  `
})
