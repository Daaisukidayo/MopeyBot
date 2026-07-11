import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_announcements.name,
  aliases: commandsData.command_announcements.aliases,
  type: "messageCreate",
  code: `
    $handleAnnouncements
  `
})