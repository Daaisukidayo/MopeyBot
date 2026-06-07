import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_muid.commandName,
  aliases: commandsData.command_muid.commandAliases,
  type: "messageCreate",
  code: `
    $handleMuid
  `
}
