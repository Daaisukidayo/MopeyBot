import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_leaderboard.name,
  aliases: commandsData.command_leaderboard.aliases,
  type: "messageCreate",
  code: `
    $handleLeaderboard
  `,
})
