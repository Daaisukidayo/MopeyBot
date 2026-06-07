import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_time.commandName,
  aliases: commandsData.command_time.commandAliases,
  type: "messageCreate",
  code: `
    $handleTime
  `
}
