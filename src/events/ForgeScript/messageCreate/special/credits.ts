import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_credits.commandName,
  aliases: commandsData.command_credits.commandAliases,
  type: "messageCreate",
  code: `
    $handleCredits
  `
}
