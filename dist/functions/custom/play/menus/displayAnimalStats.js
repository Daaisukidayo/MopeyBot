"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "displayAnimalStats",
    params: [
        {
            name: "playDataVar",
            description: "The name of the variable that holds the play data.",
            type: forgescript_1.ArgType.String
        },
        {
            name: "wardrobeVar",
            description: "The name of the variable that holds the user's wardrobe.",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    $let[l;$jsonGet[userProfile;language]]

    $let[animalId;$jsonGet[playData;currentAnimal]]
    $let[wardrobeIndex;$default[$jsonGet[wardrobe;$get[animalId]];0]]
    $let[emoji;$getAnimalInfo[$get[animalId];emoji;$get[wardrobeIndex]]]
    $let[animalName;$getAnimalInfo[$get[animalId];name;$get[wardrobeIndex]]]
    $let[exp;$jsonGet[playData;XP]]
    $let[tier;$jsonGet[playData;tier]]
    $let[minExp;$jsonGet[xpPerTier;$get[tier];0]]
    $let[maxExp;$jsonGet[xpPerTier;$get[tier];1]]
    $let[MC;$jsonGet[playData;MC]]
    $let[thumbnail;$animalImage[$get[animalId];$get[wardrobeIndex]]]

    $addSection[
      $addTextDisplay[## $get[emoji] $get[animalName]]
      $addTextDisplay[## $separate[$get[MC]]$getGlobalVar[mopecoin]]
      $addTextDisplay[## $abbreviateNumber[$get[exp]] / $abbreviateNumber[$get[maxExp]] $tl[ui.play.xp.$get[l]]]
      $addThumbnail[$get[thumbnail]]
    ]
    $addTextDisplay[### 【$bar[$math[$get[exp] - $get[minExp]];$math[$get[maxExp] - $get[minExp]];15;█;░;]】]
  `
});
//# sourceMappingURL=displayAnimalStats.js.map