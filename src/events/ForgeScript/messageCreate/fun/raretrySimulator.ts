import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_raretrysimulator.commandName,
  aliases: commandsData.command_raretrysimulator.commandAliases,
  type: "messageCreate",
  code: `
    $handleRaretrysimulator
  `
}
