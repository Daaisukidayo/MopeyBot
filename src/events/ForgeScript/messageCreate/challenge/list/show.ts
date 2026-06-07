import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_showlist.commandName,
  aliases: commandsData.command_showlist.commandAliases,
  type: "messageCreate",
  code: `
    $handleShowList
  `
}
