import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_start.name,
  aliases: commandsData.command_start.aliases,
  type: "messageCreate",
  code: `
    $handleStart
  `,
})
