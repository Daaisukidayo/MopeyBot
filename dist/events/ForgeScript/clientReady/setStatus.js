"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "clientReady",
    code: `
    $logger[Info;Bot $username[$botID] is ready]

    $c[Each call shows both statuses for 15s, so a 30s interval keeps them alternating]
    $setInterval[$updateBotStatus;30s]
    $updateBotStatus
  `,
});
//# sourceMappingURL=setStatus.js.map