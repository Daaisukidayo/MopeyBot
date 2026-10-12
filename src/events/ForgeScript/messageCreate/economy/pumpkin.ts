import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_pumpkin.name,
  aliases: commandsData.command_pumpkin.aliases,
  type: "messageCreate",
  code: `
    $handleSoccer
  `
})
