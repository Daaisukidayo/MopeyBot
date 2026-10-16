import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_weekly.name,
  aliases: commandsData.command_weekly.aliases,
  type: "messageCreate",
  code: `
    $handleWeekly
  `,
})
