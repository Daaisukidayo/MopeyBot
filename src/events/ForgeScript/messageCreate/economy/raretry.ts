import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_raretry.commandName,
  aliases: commandsData.command_raretry.commandAliases,
  type: "messageCreate",
  code: `
    $handleRaretry
  `
}
