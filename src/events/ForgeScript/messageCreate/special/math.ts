import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_math.commandName,
  aliases: commandsData.command_math.commandAliases,
  type: "messageCreate",
  code: `
    $handleMath
  `
}
