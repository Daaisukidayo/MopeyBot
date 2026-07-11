import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_rules.name,
  aliases: commandsData.command_rules.aliases,
  type: "messageCreate",
  code: `
    $handleRules
  `
})