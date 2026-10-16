import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_pause.name,
  aliases: commandsData.command_pause.aliases,
  type: "messageCreate",
  code: `
    $handlePause
  `,
})
