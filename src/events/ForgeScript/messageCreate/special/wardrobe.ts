import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_wardrobe.name,
  aliases: commandsData.command_wardrobe.aliases,
  type: "messageCreate",
  code: `
    $handleWardrobe
  `,
})
