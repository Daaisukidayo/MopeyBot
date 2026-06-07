import { commandsData } from "#commandsData"
const slash = commandsData.command_beachball.slash

export default {
  independent: true,
  code: `
    $handleSoccer
  `,
  data: {
    type: 1,

    name: slash.name["en-US"],
    name_localizations: {
      "en-US": slash.name["en-US"],
      "ru": slash.name["ru"],
    },
    
    description: slash.description["en-US"],
    description_localizations: {
      "en-US": slash.description["en-US"],
      "ru": slash.description["ru"],
    },
  }
}