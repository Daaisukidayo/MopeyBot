import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_ping.commandName,
  aliases: commandsData.command_ping.commandAliases,
  type: "messageCreate",
  code: `
    $handlePing
  `
}
