"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_leaderboard.slash;
const options = slash.options;
exports.default = {
    independent: true,
    code: `
    $handleLeaderboard
  `,
    data: {
        type: 1,
        integration_types: [
            0
        ],
        contexts: [
            0
        ],
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
                min_value: 1,
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
                type: 4,
                required: false,
                min_value: 1,
                max_value: 10,
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
        ],
    }
};
//# sourceMappingURL=leaderboard.js.map