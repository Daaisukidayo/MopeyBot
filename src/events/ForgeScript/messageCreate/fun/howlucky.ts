import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_howlucky.name,
  aliases: commandsData.command_howlucky.aliases,
  type: "messageCreate",
  code: `
    $handleHowlucky
  `
})
