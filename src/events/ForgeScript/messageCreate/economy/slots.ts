import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_slots.commandName,
  aliases: commandsData.command_slots.commandAliases,
  type: "messageCreate",
  code: `
    $handleSlots
  `
}
