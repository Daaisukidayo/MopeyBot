import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_chart.name,
  aliases: commandsData.command_chart.aliases,
  type: "messageCreate",
  code: `
    $handleChart
  `,
})
