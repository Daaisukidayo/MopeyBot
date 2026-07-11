import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_showlist.name,
  aliases: commandsData.command_showlist.aliases,
  type: "messageCreate",
  code: `
    $handleShowList
  `
})