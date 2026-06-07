import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_daily.commandName,
  aliases: commandsData.command_daily.commandAliases,
  type: "messageCreate",
  code: `
    $handleDaily
  `
}
