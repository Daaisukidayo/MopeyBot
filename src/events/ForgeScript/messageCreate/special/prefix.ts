import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_prefix.commandName,
  aliases: commandsData.command_prefix.commandAliases,
  type: "messageCreate",
  code: `
    $handlePrefix
  `
}
