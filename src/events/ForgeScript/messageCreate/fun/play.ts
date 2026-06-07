import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_play.commandName,
  aliases: commandsData.command_play.commandAliases,
  type: "messageCreate",
  code: `
    $handlePlay
  `
}
