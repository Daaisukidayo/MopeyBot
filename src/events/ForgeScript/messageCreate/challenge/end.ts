import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_end.name,
  aliases: commandsData.command_end.aliases,
  type: "messageCreate",
  code: `
    $handleEnd
  `,
})
