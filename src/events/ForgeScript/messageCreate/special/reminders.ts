import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_reminders.name,
  aliases: commandsData.command_reminders.aliases,
  type: "messageCreate",
  code: `
    $handleReminders
  `
})