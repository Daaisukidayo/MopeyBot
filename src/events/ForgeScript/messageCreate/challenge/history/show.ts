import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_showhistory.name,
  aliases: commandsData.command_showhistory.aliases,
  type: "messageCreate",
  code: `
    $handleShowHistory
  `,
})
