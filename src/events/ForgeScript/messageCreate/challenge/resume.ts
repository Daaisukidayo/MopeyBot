import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_resume.commandName,
  aliases: commandsData.command_resume.commandAliases,
  type: "messageCreate",
  code: `
    $handleResume
  `
}
