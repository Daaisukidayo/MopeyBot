import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_count.name,
  aliases: commandsData.command_count.aliases,
  type: "messageCreate",
  code: `
    $handleCount
  `
})