import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_beachball.commandName,
  aliases: commandsData.command_beachball.commandAliases,
  type: "messageCreate",
  code: `
    $handleSoccer
  `
}
