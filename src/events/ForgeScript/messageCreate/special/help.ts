import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_help.name,
  type: "messageCreate",
  code: `
    $handleHelp
  `,
})
