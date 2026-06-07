import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_clearcoins.commandName,
  aliases: commandsData.command_clearcoins.commandAliases,
  type: "messageCreate",
  code: `
    $handleClearcoins
  `
}
