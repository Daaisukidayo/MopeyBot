"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addCheats",
    description: "adds the cheat buttons",
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $if[$env[$env[playDataVar]]==;$return]
    $ref[playData;$env[playDataVar]]
    $if[$and[$jsonGet[playData;is_dead]==false;$jsonGet[userProfile;tester]]==false;$return]

    $let[l;$jsonGet[userProfile;language]]

    $c[tier button opens a modal for any tier, the rares toggle is green while all the tier's rares show up in upgrades]
    $addActionRow
    $addButton[play_chooseUpgrade-devUpArrow-$playID[playData];;Success;🔼]
    $addButton[play_chooseUpgrade-devTier-$playID[playData];$tl[ui.play.devTierButton.$get[l];$jsonGet[playData;tier]];Secondary]
    $addButton[play_chooseUpgrade-devDownArrow-$playID[playData];;Success;🔽]
    $addButton[play_chooseUpgrade-devUpdateArrow-$playID[playData];;Success;🔃]
    $addButton[play_chooseUpgrade-toggleRares-$playID[playData];Toggle rares;$if[$jsonGet[playData;dev;showAllRares];Success;Secondary];🍀]
  `,
});
//# sourceMappingURL=addCheats.js.map