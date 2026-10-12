import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_addhistory.name,
  aliases: commandsData.command_addhistory.aliases,
  type: "messageCreate",
  code: `
    $handleAddHistory
  `
})
