"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const getLocalization_js_1 = require("../../utils/getLocalization.js");
const forgescript_1 = require("@tryforge/forgescript");
const slash = _commandsData_1.commandsData.command_coinflip.slash;
const options = slash.options;
exports.default = new forgescript_1.ApplicationCommand({
    independent: true,
    code: `
    $handleCoinflip
  `,
    data: {
        type: 1,
        ...(0, getLocalization_js_1.localized)(slash),
        options: [
            { type: 4, required: false, min_value: 5, ...(0, getLocalization_js_1.localized)(options[0]) },
            {
                type: 3,
                required: false,
                ...(0, getLocalization_js_1.localized)(options[1]),
                choices: [
                    { ...(0, getLocalization_js_1.localized)(options[1].choices[0]), value: "h" },
                    { ...(0, getLocalization_js_1.localized)(options[1].choices[1]), value: "t" },
                ],
            },
        ],
    },
});
//# sourceMappingURL=coinflip.js.map