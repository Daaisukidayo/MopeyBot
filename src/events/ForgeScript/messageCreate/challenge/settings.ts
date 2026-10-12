import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_settings.name,
  aliases: commandsData.command_settings.aliases,
  type: "messageCreate",
  code: `
    $handleSettings
  `
})
