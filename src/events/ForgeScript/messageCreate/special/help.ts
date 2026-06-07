import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_help.commandName,
  type: "messageCreate",
  code: `
    $handleHelp
  `
}