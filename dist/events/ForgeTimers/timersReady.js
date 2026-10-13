"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "timersReady",
    code: `
    $logger[Info;ForgeTimers | Restored $eventData[restored] timers, dropped $eventData[dropped]]
  `
});
//# sourceMappingURL=timersReady.js.map