"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const slash = _commandsData_1.commandsData.command_ping.slash;
exports.default = {
    independent: true,
    code: `
    $handlePing
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
};
//# sourceMappingURL=ping.js.map