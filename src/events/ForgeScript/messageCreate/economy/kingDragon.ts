import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_kingdragon.commandName,
  aliases: commandsData.command_kingdragon.commandAliases,
  type: "messageCreate",
  code: `
    $handleKingdragon
  `
}
