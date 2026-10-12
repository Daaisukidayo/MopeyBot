import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_beachball.name,
  aliases: commandsData.command_beachball.aliases,
  type: "messageCreate",
  code: `
    $handleSoccer
  `
})
