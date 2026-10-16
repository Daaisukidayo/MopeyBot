import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_math.name,
  aliases: commandsData.command_math.aliases,
  type: "messageCreate",
  code: `
    $handleMath
  `,
})
