import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_coinflip.commandName,
  aliases: commandsData.command_coinflip.commandAliases,
  type: "messageCreate",
  code: `
    $handleCoinflip
  `
}
