import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_progress.commandName,
  aliases: commandsData.command_progress.commandAliases,
  type: "messageCreate",
  code: `
    $handleProgress
  `
}
