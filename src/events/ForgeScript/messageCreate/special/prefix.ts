import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_prefix.name,
  aliases: commandsData.command_prefix.aliases,
  type: "messageCreate",
  code: `
    $handlePrefix
  `,
})
