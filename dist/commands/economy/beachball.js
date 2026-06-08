"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_beachball.slash;
exports.default = {
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
};
//# sourceMappingURL=beachball.js.map