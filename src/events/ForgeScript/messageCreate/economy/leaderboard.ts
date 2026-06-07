import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_leaderboard.commandName,
  aliases: commandsData.command_leaderboard.commandAliases,
  type: "messageCreate",
  code: `
    $handleLeaderboard
  `
}
