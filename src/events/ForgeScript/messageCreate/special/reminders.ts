import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_reminders.commandName,
  aliases: commandsData.command_reminders.commandAliases,
  type: "messageCreate",
  code: `
    $handleReminders
  `
}
