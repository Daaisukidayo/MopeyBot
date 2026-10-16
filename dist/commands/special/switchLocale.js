"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const getLocalization_js_1 = require("../../utils/getLocalization.js");
const forgescript_1 = require("@tryforge/forgescript");
const slash = _commandsData_1.commandsData.command_switchlocale.slash;
const options = slash.options;
exports.default = new forgescript_1.ApplicationCommand({
    independent: true,
    code: `
    $handleSwitchlocale
  `,
    data: {
        type: 1,
        ...(0, getLocalization_js_1.localized)(slash),
        options: [{ type: 3, required: true, autocomplete: true, ...(0, getLocalization_js_1.localized)(options[0]) }],
    },
});
//# sourceMappingURL=switchLocale.js.map