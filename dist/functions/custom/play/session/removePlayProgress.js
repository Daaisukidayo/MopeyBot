"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "removePlayProgress",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $callMethod[userProfile;addCoins;$jsonGet[playData;mope_coins]]
    $callMethod[userProfile;save]

    $deleteUserVar[allRareAttemptsInfo]
    $deleteUserVar[userPlayData]
  `,
});
//# sourceMappingURL=removePlayProgress.js.map