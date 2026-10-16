import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_raretry.name,
  aliases: commandsData.command_raretry.aliases,
  type: "messageCreate",
  code: `
    $handleRaretry
  `,
})
