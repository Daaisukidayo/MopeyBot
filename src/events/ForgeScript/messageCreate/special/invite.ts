import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_invite.name,
  aliases: commandsData.command_invite.aliases,
  type: "messageCreate",
  code: `
    $handleInvite
  `
})
