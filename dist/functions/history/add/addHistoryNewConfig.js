"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: "addHistoryNewConfig",
    description: "Resets or creates a new config for 'add history' commands for the user.",
    code: `
    $jsonLoad[baseHistoryPage;$getGlobalVar[baseHistoryPage]]
    $!jsonSet[baseHistoryPage;endDate;"$getTimestamp"]
    $setUserVar[addHistorySavedConfig;$env[baseHistoryPage]]
  `
};
//# sourceMappingURL=addHistoryNewConfig.js.map