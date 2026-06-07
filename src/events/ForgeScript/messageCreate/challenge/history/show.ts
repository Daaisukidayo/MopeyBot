import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_showhistory.commandName,
  aliases: commandsData.command_showhistory.commandAliases,
  type: "messageCreate",
  code: `
    $handleShowHistory
  `
}
