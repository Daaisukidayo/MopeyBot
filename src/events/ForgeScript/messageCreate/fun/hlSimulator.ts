import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_hlsimulator.commandName,
  aliases: commandsData.command_hlsimulator.commandAliases,
  type: "messageCreate",
  code: `
    $handleHlsimulator
  `
}
