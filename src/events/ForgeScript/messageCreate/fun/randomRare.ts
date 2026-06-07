import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_randomrare.commandName,
  aliases: commandsData.command_randomrare.commandAliases,
  type: "messageCreate",
  code: `
    $handleRandomrare
  `
}
