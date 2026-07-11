import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_kingdragon.name,
  aliases: commandsData.command_kingdragon.aliases,
  type: "messageCreate",
  code: `
    $handleKingdragon
  `
})