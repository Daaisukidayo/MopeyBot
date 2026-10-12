import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_progress.name,
  aliases: commandsData.command_progress.aliases,
  type: "messageCreate",
  code: `
    $handleProgress
  `
})
