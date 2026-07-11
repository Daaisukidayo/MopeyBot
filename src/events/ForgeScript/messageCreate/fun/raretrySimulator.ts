import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_raretrysimulator.name,
  aliases: commandsData.command_raretrysimulator.aliases,
  type: "messageCreate",
  code: `
    $handleRaretrysimulator
  `
})