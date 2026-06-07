import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_weekly.commandName,
  aliases: commandsData.command_weekly.commandAliases,
  type: "messageCreate",
  code: `
    $handleWeekly
  `
}
