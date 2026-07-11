import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_clearcoins.name,
  aliases: commandsData.command_clearcoins.aliases,
  type: "messageCreate",
  code: `
    $handleClearcoins
  `
})
