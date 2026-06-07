import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_snora.commandName,
  aliases: commandsData.command_snora.commandAliases,
  type: "messageCreate",
  code: `
    $handleSnora
  `
}
