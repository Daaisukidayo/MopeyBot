import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_resume.name,
  aliases: commandsData.command_resume.aliases,
  type: "messageCreate",
  code: `
    $handleResume
  `
})
