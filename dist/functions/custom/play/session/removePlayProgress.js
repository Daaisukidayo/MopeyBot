"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "removePlayProgress",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $sumCash[$jsonGet[playData;mope_coins]]
    $saveProfile[$env[userProfile]]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `,
});
//# sourceMappingURL=removePlayProgress.js.map