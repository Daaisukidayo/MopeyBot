import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_announcements.commandName,
  aliases: commandsData.command_announcements.commandAliases,
  type: "messageCreate",
  code: `
    $handleAnnouncements
  `
}
