import { commandsData } from "#commandsData"
const slash = commandsData.command_clearcoins.slash

export default {
  independent: true,
  code: `
    $handleClearcoins
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