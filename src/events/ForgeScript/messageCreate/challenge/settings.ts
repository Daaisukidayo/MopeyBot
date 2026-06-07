import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_settings.commandName,
  aliases: commandsData.command_settings.commandAliases,
  type: "messageCreate",
  code: `
    $handleSettings
  `
}
