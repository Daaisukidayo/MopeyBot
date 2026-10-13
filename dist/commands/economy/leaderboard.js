"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const getLocalization_js_1 = require("../../utils/getLocalization.js");
const forgescript_1 = require("@tryforge/forgescript");
const slash = _commandsData_1.commandsData.command_leaderboard.slash;
const options = slash.options;
exports.default = new forgescript_1.ApplicationCommand({
    independent: true,
    code: `
    $handleLeaderboard
  `,
    data: {
        type: 1,
        integration_types: [0],
        contexts: [0],
        ...(0, getLocalization_js_1.localized)(slash),
        options: [
            { type: 4, required: false, min_value: 1, ...(0, getLocalization_js_1.localized)(options[0]) },
            { type: 4, required: false, min_value: 1, max_value: 10, ...(0, getLocalization_js_1.localized)(options[1]) }
        ]
    }
});
//# sourceMappingURL=leaderboard.js.map