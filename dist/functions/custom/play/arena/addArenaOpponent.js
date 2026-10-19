"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addArenaOpponent",
    description: "Sets up an arena opponent with a random wardrobe and adds the arena intro with action buttons",
    brackets: true,
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "opponentId",
            description: "The animal ID of the opponent",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "opponentTier",
            description: "The tier of the opponent (any existing tier, 1-17)",
            type: forgescript_1.ArgType.Number,
        },
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[oppWrI;$arrayRandomIndex[$getAnimalInfo[$env[opponentId];skins]]]
    $let[oppDisplay;$getAnimalInfo[$env[opponentId];name;$get[oppWrI]]]
    $let[thumbnail;$animalImage[$env[opponentId];$get[oppWrI]]]
    $let[opponentXP;$random[$jsonGet[xpPerTier;$env[opponentTier];0];$jsonGet[xpPerTier;$env[opponentTier];1]]]

    $callMethod[playData;meetOpponent;$env[opponentId];$get[oppWrI];$env[opponentTier];$get[opponentXP]]

    $addSection[
      $addThumbnail[$get[thumbnail]]
      $addTextDisplay[$tl[ui.play.arena.wentInArena.$get[l];$get[oppDisplay]]]
    ]
    $addArenaActionButtons
    $addArenaDevMenu[playData]
  `,
});
//# sourceMappingURL=addArenaOpponent.js.map