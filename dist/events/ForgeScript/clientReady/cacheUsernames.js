"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.BaseCommand({
    type: "clientReady",
    code: `
    $arrayForEach[$getGlobalVar[allUserIDs];id;$username[$env[id]]]
  `
});
//# sourceMappingURL=cacheUsernames.js.map