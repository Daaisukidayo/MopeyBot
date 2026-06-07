import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_raretryrun.commandName,
  aliases: commandsData.command_raretryrun.commandAliases,
  type: "messageCreate",
  code: `
    $handleRaretryrun
  `
}
