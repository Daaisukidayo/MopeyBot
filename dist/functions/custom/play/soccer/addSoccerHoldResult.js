"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addSoccerHoldResult",
    description: "adds the result of a soccer hold (holdSoccer) or loss: text, animal stats and the next menus",
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "var w/ the play data",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "wardrobeVar",
            description: "var w/ the user's wardrobe",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerType",
            description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "soccerId",
            description: "the soccer item's ID",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "textKey",
            description: "the ui.play.soccer key used when the soccer's held, like 'held' or 'goalFailed'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "result",
            description: "the result JSON: {outcome, MC?, XP?}. any outcome but 'held' is a loss w/ its own locale key",
            type: forgescript_1.ArgType.Json,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[soccer;$getSoccerDisplay[$env[soccerType];$env[soccerId]]]
    $let[outcome;$jsonGet[result;outcome]]

    $if[$get[outcome]!=held;
      $addSoccerSection[$env[soccerType];$env[soccerId];$tl[ui.play.soccer.$get[outcome].$get[l];$get[soccer]]]
      $addSeparator[Large]
      $displayAnimalStats[playData;wardrobe]
      $addActionsMenu[playData]
      $return
    ]

    $addSoccerSection[$env[soccerType];$env[soccerId];$tl[ui.play.soccer.$env[textKey].$get[l];$get[soccer];$separate[$jsonGet[result;MC]];$separate[$jsonGet[result;XP]]]]
    $addSeparator[Large]
    $displayAnimalStats[playData;wardrobe]
    $addHeldSoccerMenu[playData]
  `,
});
//# sourceMappingURL=addSoccerHoldResult.js.map