import { commandsData } from "#commandsData"

export default {
  name: commandsData.command_vote.commandName,
  aliases: commandsData.command_vote.commandAliases,
  type: "messageCreate",
  code: `
    $handleVote
  `
}
