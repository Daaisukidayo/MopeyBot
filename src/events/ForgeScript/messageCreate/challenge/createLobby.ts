import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_createlobby.commandName,
  aliases: commandsData.command_createlobby.commandAliases,
  type: "messageCreate",
  code: `
    $handleCreateLobby
  `
}