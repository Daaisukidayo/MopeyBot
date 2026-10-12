import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_credits.name,
  aliases: commandsData.command_credits.aliases,
  type: "messageCreate",
  code: `
    $handleCredits
  `
})
