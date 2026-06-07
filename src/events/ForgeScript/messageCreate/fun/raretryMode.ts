import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_raretrymode.commandName,
  aliases: commandsData.command_raretrymode.commandAliases,
  type: "messageCreate",
  code: `
    $handleRaretrymode
  `
}
