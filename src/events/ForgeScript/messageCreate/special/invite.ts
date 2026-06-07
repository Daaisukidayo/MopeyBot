import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_invite.commandName,
  aliases: commandsData.command_invite.commandAliases,
  type: "messageCreate",
  code: `
    $handleInvite
  `
}
