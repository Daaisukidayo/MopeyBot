"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_coinflip.slash;
const options = slash.options;
exports.default = {
    independent: true,
    code: `
    $handleCoinflip
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
                type: 4,
                required: false,
                min_value: 5,
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
                choices: [
                    {
                        name: options[1].choices[0].name["default"],
                        name_localizations: {
                            "en-US": options[1].choices[0].name["en-US"],
                            "ru": options[1].choices[0].name["ru"]
                        },
                        value: "h",
                    },
                    {
                        name: options[1].choices[1].name["default"],
                        name_localizations: {
                            "en-US": options[1].choices[1].name["en-US"],
                            "ru": options[1].choices[1].name["ru"]
                        },
                        value: "t",
                    }
                ]
            }
        ]
    }
};
//# sourceMappingURL=coinflip.js.map