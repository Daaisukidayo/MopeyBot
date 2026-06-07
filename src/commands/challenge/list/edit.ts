import { commandsData } from "#commandsData"
const slash = commandsData.command_editlist.slash
const options = slash.options

export default {
  code: `
    $handleEditlist
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
        },
      },
      {
        type: 3,
        required: true,

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

        choices: [
          { 
            name: options[1].choices[0].name["default"],
            name_localizations: {
              "en-US": options[1].choices[0].name["en-US"],
              "ru": options[1].choices[0].name["ru"]
            }, 
            value: '+'
          },
          { 
            name: options[1].choices[1].name["default"],
            name_localizations: {
              "en-US": options[1].choices[1].name["en-US"],
              "ru": options[1].choices[1].name["ru"]
            }, 
            value: '-'
          },
        ]
      },
      {
        type: 3,
        required: true,

        name: options[2].name["default"],
        name_localizations: {
          "en-US": options[2].name["en-US"],
          "ru": options[2].name["ru"]
        },
        
        description: options[2].description["default"],
        description_localizations: {
          "en-US": options[2].description["en-US"],
          "ru": options[2].description["ru"]
        },
      },
    ]
  }
}