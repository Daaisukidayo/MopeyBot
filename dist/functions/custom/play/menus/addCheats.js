"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addCheats",
    description: "Adds cheat buttons for a player's play session",
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
    $if[$and[$jsonGet[playData;isDead]==false;$jsonGet[userProfile;testerMode]]==false;$return]

    $let[l;$jsonGet[userProfile;language]]

    $c[The tier button opens a modal to type any tier. The rares switch is green while every rare of the tier is shown in the upgrade choice]
    $addActionRow
    $addButton[play_chooseUpgrade-devUpArrow-$authorID;;Success;🔼]
    $addButton[play_chooseUpgrade-devTier-$authorID;$tl[ui.play.devTierButton.$get[l];$jsonGet[playData;tier]];Secondary]
    $addButton[play_chooseUpgrade-devDownArrow-$authorID;;Success;🔽]
    $addButton[play_chooseUpgrade-devUpdateArrow-$authorID;;Success;🔃]
    $addButton[play_chooseUpgrade-toggleRares-$authorID;Toggle rares;$if[$jsonGet[playData;devShowAllRares];Success;Secondary];🍀]
  `
});
//# sourceMappingURL=addCheats.js.map