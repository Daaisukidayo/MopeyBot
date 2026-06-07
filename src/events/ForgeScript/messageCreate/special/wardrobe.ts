import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_wardrobe.commandName,
  aliases: commandsData.command_wardrobe.commandAliases,
  type: "messageCreate",
  code: `
    $handleWardrobe
  `
}
