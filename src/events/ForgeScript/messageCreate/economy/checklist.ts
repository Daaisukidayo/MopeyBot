import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_checklist.name,
  aliases: commandsData.command_checklist.aliases,
  type: "messageCreate",
  code: `
    $handleChecklist
  `,
})
