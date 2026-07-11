import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_report.name,
  aliases: commandsData.command_report.aliases,
  type: "messageCreate",
  code: `
    $handleReport
  `
})