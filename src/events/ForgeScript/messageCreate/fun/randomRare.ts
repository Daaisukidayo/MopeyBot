import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_randomrare.name,
  aliases: commandsData.command_randomrare.aliases,
  type: "messageCreate",
  code: `
    $handleRandomrare
  `
})