import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_umbrella.commandName,
  aliases: commandsData.command_umbrella.commandAliases,
  type: "messageCreate",
  code: `
    $handleSoccer
  `
}
