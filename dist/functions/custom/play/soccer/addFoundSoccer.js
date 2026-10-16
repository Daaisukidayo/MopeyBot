"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addFoundSoccer",
    description: "Adds the 'found soccer' screen with its rarity, animal stats and soccer actions menu",
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "wardrobeVar",
            description: "The name of the variable that holds the user's wardrobe.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerType",
            description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "The ID of the soccer item",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]

    $c[A newly found soccer is not held yet]
    $!jsonDelete[playData;heldSoccer]

    $c[The rarity is shown as "1 in N", rounded from the chance in percent]
    $let[rarity;$round[$math[100 / $jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];chance]]]]
    $arrayLoad[soccerData;_;$env[soccerType]_$env[soccerId]]

    $addSoccerSection[$env[soccerType];$env[soccerId];$tl[ui.play.found.$get[l];$getSoccerDisplay[$env[soccerType];$env[soccerId]]]]
    $if[$get[rarity]>1;
      $addTextDisplay[$tl[ui.$env[soccerType].rarity.$get[l];1;$separate[$get[rarity]]]]
    ]
    $addSeparator[Large]

    $displayAnimalStats[playData;wardrobe]
    $addSoccerActionsMenu[$env[soccerData]]
  `,
});
//# sourceMappingURL=addFoundSoccer.js.map