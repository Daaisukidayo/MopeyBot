"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const getLocalization_js_1 = require("../../utils/getLocalization.js");
const forgescript_1 = require("@tryforge/forgescript");
const slash = _commandsData_1.commandsData.command_prefix.slash;
const options = slash.options;
exports.default = new forgescript_1.ApplicationCommand({
    independent: true,
    code: `
    $handlePrefix
  `,
    data: {
        type: 1,
        integration_types: [0],
        contexts: [0],
        default_member_permissions: "32",
        ...(0, getLocalization_js_1.localized)(slash),
        options: [{ type: 3, required: true, min_length: 1, max_length: 5, ...(0, getLocalization_js_1.localized)(options[0]) }],
    },
});
//# sourceMappingURL=prefix.js.map