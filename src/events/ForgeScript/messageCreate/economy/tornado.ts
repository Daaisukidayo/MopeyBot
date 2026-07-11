import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_tornado.name,
  aliases: commandsData.command_tornado.aliases,
  type: "messageCreate",
  code: `
    $handleTornado
  `
})