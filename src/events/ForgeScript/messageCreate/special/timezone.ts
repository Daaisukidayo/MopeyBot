import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_timezone.name,
  aliases: commandsData.command_timezone.aliases,
  type: "messageCreate",
  code: `
    $handleTimezone
  `
})
