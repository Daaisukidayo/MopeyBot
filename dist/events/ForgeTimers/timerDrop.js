"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "timerDrop",
    code: `
    $logger[Warn;ForgeTimers | Dropped $timerData[kind] "$timerData[name]": $eventData[dropReason]]
  `,
});
//# sourceMappingURL=timerDrop.js.map