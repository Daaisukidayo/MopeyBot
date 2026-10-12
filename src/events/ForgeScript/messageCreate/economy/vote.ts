import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_vote.name,
  aliases: commandsData.command_vote.aliases,
  type: "messageCreate",
  code: `
    $handleVote
  `
})
