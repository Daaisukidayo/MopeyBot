import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_hlsimulator.name,
  aliases: commandsData.command_hlsimulator.aliases,
  type: "messageCreate",
  code: `
    $handleHlsimulator
  `
})