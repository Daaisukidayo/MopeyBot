import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_rules.commandName,
  aliases: commandsData.command_rules.commandAliases,
  type: "messageCreate",
  code: `
    $handleRules
  `
}
