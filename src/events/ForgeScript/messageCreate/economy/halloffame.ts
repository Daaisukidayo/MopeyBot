import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_halloffame.name,
  aliases: commandsData.command_halloffame.aliases,
  type: "messageCreate",
  code: `
    $handleHalloffame
  `,
})
