import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_editlist.commandName,
  aliases: commandsData.command_editlist.commandAliases,
  type: "messageCreate",
  code: `
    $handleEditList
  `
}
