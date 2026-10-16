import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_daily.name,
  aliases: commandsData.command_daily.aliases,
  type: "messageCreate",
  code: `
    $handleDaily
  `,
})
