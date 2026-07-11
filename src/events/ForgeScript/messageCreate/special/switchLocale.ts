import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_switchlocale.name,
  aliases: commandsData.command_switchlocale.aliases,
  type: "messageCreate",
  code: `
    $handleSwitchlocale
  `
})