"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_prefix.slash;
const options = slash.options;
exports.default = {
    independent: true,
    code: `
    $handlePrefix
  `,
    data: {
        type: 1,
        integration_types: [
            0
        ],
        contexts: [
            0
        ],
        default_member_permissions: 32,
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
                min_length: 1,
                max_length: 5,
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
};
//# sourceMappingURL=prefix.js.map