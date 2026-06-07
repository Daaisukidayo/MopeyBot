import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_report.commandName,
  aliases: commandsData.command_report.commandAliases,
  type: "messageCreate",
  code: `
    $handleReport
  `
}
