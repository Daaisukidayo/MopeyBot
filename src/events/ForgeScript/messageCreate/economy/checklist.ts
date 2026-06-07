import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_checklist.commandName,
  aliases: commandsData.command_checklist.commandAliases,
  type: "messageCreate",
  code: `
    $handleChecklist
  `
}
