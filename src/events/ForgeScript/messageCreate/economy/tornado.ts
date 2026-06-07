import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_tornado.commandName,
  aliases: commandsData.command_tornado.commandAliases,
  type: "messageCreate",
  code: `
    $handleTornado
  `
}
