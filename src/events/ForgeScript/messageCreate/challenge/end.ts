import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_end.commandName,
  aliases: commandsData.command_end.commandAliases,
  type: "messageCreate",
  code: `
    $handleEnd
  `
}
