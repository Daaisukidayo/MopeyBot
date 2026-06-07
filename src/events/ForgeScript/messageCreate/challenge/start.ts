import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_start.commandName,
  aliases: commandsData.command_start.commandAliases,
  type: "messageCreate",
  code: `
    $handleStart
  `
}
