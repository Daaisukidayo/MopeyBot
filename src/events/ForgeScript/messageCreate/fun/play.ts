import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_play.name,
  aliases: commandsData.command_play.aliases,
  type: "messageCreate",
  code: `
    $handlePlay
  `,
})
