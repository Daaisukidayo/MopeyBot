import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_balance.name,
  aliases: commandsData.command_balance.aliases,
  type: "messageCreate",
  code: `
    $handleBalance
  `
})
