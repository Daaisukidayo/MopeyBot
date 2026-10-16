"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addHistoryNewConfig",
    description: "Creates a new config for the 'add history' command for the user: saves it and returns it.",
    output: forgescript_1.ArgType.Json,
    code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;$getTimestamp]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
    $return[$env[baseHistoryPage]]
  `,
});
//# sourceMappingURL=addHistoryNewConfig.js.map