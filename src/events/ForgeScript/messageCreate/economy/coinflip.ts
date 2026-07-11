import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_coinflip.name,
  aliases: commandsData.command_coinflip.aliases,
  type: "messageCreate",
  code: `
    $handleCoinflip
  `
})