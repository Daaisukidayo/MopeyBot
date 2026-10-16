import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_editlist.name,
  aliases: commandsData.command_editlist.aliases,
  type: "messageCreate",
  code: `
    $handleEditList
  `,
})
