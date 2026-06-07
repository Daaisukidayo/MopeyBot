import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_pause.commandName,
  aliases: commandsData.command_pause.commandAliases,
  type: "messageCreate",
  code: `
    $handlePause
  `
}
