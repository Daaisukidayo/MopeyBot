import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_createlobby.name,
  aliases: commandsData.command_createlobby.aliases,
  type: "messageCreate",
  code: `
    $handleCreateLobby
  `
})
