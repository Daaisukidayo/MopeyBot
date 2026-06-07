import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_count.commandName,
  aliases: commandsData.command_count.commandAliases,
  type: "messageCreate",
  code: `
    $handleCount
  `
}
