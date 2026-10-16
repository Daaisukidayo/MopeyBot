"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "resetArenaData",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $!jsonSet[playData;arena;$jsonGet[$getGlobalVar[userPlayData];arena]]
  `,
});
//# sourceMappingURL=resetArenaData.js.map