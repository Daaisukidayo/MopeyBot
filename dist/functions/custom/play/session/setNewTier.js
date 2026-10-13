"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "setNewTier",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $let[XP;$jsonGet[playData;XP]]

    $c[Every tier holds its first XP and the first XP of the next tier. Past the last tier the tier stays]
    $jsonLoad[tier;$arrayFind[$jsonEntries[$getGlobalVar[xpPerTier]];e;$inRange[$get[XP];$jsonGet[e;1;0];$math[$jsonGet[e;1;1] - 1]]]]
    $if[$env[tier]!=;$!jsonSet[playData;tier;$jsonGet[tier;0]]]
  `
});
//# sourceMappingURL=setNewTier.js.map