import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_time.name,
  aliases: commandsData.command_time.aliases,
  type: "messageCreate",
  code: `
    $handleTime
  `,
})
