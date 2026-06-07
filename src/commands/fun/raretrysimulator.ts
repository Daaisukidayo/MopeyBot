import { commandsData } from "#commandsData"
const slash = commandsData.command_raretrysimulator.slash
const options = slash.options

export default {
  independent: true,
  code: `
    $handleRaretrysimulator
  `,
  data: {
    type: 1,

    name: slash.name["default"],
    name_localizations: {
      "en-US": slash.name["en-US"],
      "ru": slash.name["ru"],
    },
    description: slash.description["default"],
    description_localizations: {
      "en-US": slash.description["en-US"],
      "ru": slash.description["ru"],
    },
    
    options: [
      {
        type: 3,
        required: false,

        name: options[0].name["default"],
        name_localizations: {
          "en-US": options[0].name["en-US"],
          "ru": options[0].name["ru"]
        },
        description: options[0].description["default"],
        description_localizations: {
          "en-US": options[0].description["en-US"],
          "ru": options[0].description["ru"]
        },
      },
      {
        type: 3,
        required: false,
        
        name: options[1].name["default"],
        name_localizations: {
          "en-US": options[1].name["en-US"],
          "ru": options[1].name["ru"]
        },
        description: options[1].description["default"],
        description_localizations: {
          "en-US": options[1].description["en-US"],
          "ru": options[1].description["ru"]
        },
      }
    ]
  }
}