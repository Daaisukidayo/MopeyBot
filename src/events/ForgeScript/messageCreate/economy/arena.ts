import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_arena.name,
  aliases: commandsData.command_arena.aliases,
  type: "messageCreate",
  code: `
    $handleArena
  `
})
