import { commandsData } from "#commandsData"
import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  name: commandsData.command_changelog.name,
  aliases: commandsData.command_changelog.aliases,
  type: "messageCreate",
  code: `
    $handleChangelog
  `,
})
