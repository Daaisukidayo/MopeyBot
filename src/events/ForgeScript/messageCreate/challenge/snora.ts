import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_snora.name,
  aliases: commandsData.command_snora.aliases,
  type: "messageCreate",
  code: `
    $handleSnora
  `
})
