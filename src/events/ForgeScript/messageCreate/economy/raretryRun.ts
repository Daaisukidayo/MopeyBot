import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_raretryrun.name,
  aliases: commandsData.command_raretryrun.aliases,
  type: "messageCreate",
  code: `
    $handleRaretryrun
  `
})
