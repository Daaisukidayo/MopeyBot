import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_chart.commandName,
  aliases: commandsData.command_chart.commandAliases,
  type: "messageCreate",
  code: `
    $handleChart
  `
}
