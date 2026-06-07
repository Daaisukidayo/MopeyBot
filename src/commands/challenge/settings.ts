import { commandsData } from "#commandsData"
const slash = commandsData.command_settings.slash

export default {
  code: `
    $handleSettings
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
}