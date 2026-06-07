import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_shop.commandName,
  aliases: commandsData.command_shop.commandAliases,
  type: "messageCreate",
  code: `
    $handleShop
  `
}
