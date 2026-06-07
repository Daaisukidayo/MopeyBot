import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_switchlocale.commandName,
  aliases: commandsData.command_switchlocale.commandAliases,
  type: "messageCreate",
  code: `
    $handleSwitchlocale
  `
}
