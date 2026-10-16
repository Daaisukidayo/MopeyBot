"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const _commandsData_1 = require("#commandsData");
const getLocalization_js_1 = require("../../../utils/getLocalization.js");
const forgescript_1 = require("@tryforge/forgescript");
const slash = _commandsData_1.commandsData.command_progress.slash;
exports.default = new forgescript_1.ApplicationCommand({
    code: `
    $handleProgress
  `,
    data: {
        type: 1,
        ...(0, getLocalization_js_1.localized)(slash),
    },
});
//# sourceMappingURL=progress.js.map