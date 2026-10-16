"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "databaseFail",
    code: `
    $logger[Error;ForgeTimers | Storage failed, timers will not survive a restart: $eventData[failReason]]
  `,
});
//# sourceMappingURL=databaseFail.js.map