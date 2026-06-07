import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_addhistory.commandName,
  aliases: commandsData.command_addhistory.commandAliases,
  type: "messageCreate",
  code: `
    $handleAddHistory
  `
}
