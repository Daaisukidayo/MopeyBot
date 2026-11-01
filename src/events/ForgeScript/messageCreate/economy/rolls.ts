import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_rolls.name,
  aliases: commandsData.command_rolls.aliases,
  type: "messageCreate",
  code: `
    $handleRolls
  `,
})
