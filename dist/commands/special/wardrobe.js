"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_wardrobe.slash;
const options = slash.options;
exports.default = {
    independent: true,
    code: `
    $handleWardrobe
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
};
//# sourceMappingURL=wardrobe.js.map