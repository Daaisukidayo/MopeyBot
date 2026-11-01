"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "connect",
    code: `
    $c[forgelint-disable-next-line glued-name]
    $logger[Info;Connected to the database | Ping: $dbPingms]
  `,
});
//# sourceMappingURL=connect.js.map