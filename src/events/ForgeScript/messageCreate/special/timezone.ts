import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_timezone.commandName,
  aliases: commandsData.command_timezone.commandAliases,
  type: "messageCreate",
  code: `
    $handleTimezone
  `
}
