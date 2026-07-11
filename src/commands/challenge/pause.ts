import { commandsData } from "#commandsData"
import { ApplicationCommand } from "@tryforge/forgescript"
const slash = commandsData.command_pause.slash

export default new ApplicationCommand({
  code: `
    $handlePause
  `,
  data: {
    type: 1,

    name: slash.name["default"],
    name_localizations: {
      "en-US": slash.name["en-US"],
      "ru": slash.name["ru"]
    },
    
    description: slash.description["default"],
    description_localizations: {
      "en-US": slash.description["en-US"],
      "ru": slash.description["ru"]
    },
  }
})