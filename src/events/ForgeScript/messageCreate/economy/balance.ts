import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_balance.commandName,
  aliases: commandsData.command_balance.commandAliases,
  type: "messageCreate",
  code: `
    $handleBalance
  `
}
