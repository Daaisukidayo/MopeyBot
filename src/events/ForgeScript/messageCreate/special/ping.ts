import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_ping.name,
  aliases: commandsData.command_ping.aliases,
  type: "messageCreate",
  code: `
    $handlePing
  `
})
