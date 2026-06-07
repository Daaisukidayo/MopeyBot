import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_howlucky.commandName,
  aliases: commandsData.command_howlucky.commandAliases,
  type: "messageCreate",
  code: `
    $handleHowlucky
  `
}
