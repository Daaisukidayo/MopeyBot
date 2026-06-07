import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_pumpkin.commandName,
  aliases: commandsData.command_pumpkin.commandAliases,
  type: "messageCreate",
  code: `
    $handleSoccer
  `
}
