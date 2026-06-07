import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_arena.commandName,
  aliases: commandsData.command_arena.commandAliases,
  type: "messageCreate",
  code: `
    $handleArena
  `
}
