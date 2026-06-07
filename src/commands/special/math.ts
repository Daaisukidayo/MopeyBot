import { commandsData } from "#commandsData"
const slash = commandsData.command_math.slash
const options = slash.options

export default {
  independent: true,
  code: `
    $handleMath
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

    options: [
      {
        type: 3,
        required: true,

        name: options[0].name["default"],
        name_localizations: {
          "en-US": options[0].name["en-US"],
          "ru": options[0].name["ru"]
        },
        description: options[0].description["default"],
        description_localizations: {
          "en-US": options[0].description["en-US"],
          "ru": options[0].description["ru"]
        }
      }
    ]
  }
}