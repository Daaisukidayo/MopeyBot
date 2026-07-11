import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_muid.name,
  aliases: commandsData.command_muid.aliases,
  type: "messageCreate",
  code: `
    $handleMuid
  `
})