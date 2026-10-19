"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "displayAnimalStats",
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
    ],
    code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    $let[l;$jsonGet[userProfile;language]]

    $let[animalId;$jsonGet[playData;animal_id]]
    $let[wardrobeIndex;$default[$jsonGet[playData;animal_skin_id];0]]
    $let[emoji;$getAnimalInfo[$get[animalId];emoji;$get[wardrobeIndex]]]
    $let[animalName;$getAnimalInfo[$get[animalId];name;$get[wardrobeIndex]]]
    $let[exp;$jsonGet[playData;xp]]
    $let[tier;$jsonGet[playData;tier]]
    $let[minExp;$jsonGet[xpPerTier;$get[tier];0]]
    $let[maxExp;$jsonGet[xpPerTier;$get[tier];1]]
    $let[MC;$jsonGet[playData;mope_coins]]
    $let[thumbnail;$animalImage[$get[animalId];$get[wardrobeIndex]]]

    $c[One text for the three lines: a message holds 40 components at most, the arena win screen nears it]
    $addSection[
      $addTextDisplay[## $get[emoji] $get[animalName]\n## $separate[$get[MC]]$getGlobalVar[mopecoin]\n## $abbreviateNumber[$get[exp]] / $abbreviateNumber[$get[maxExp]] $tl[ui.play.xp.$get[l]]]
      $addThumbnail[$get[thumbnail]]
    ]
    $addTextDisplay[### 【$bar[$math[$get[exp] - $get[minExp]];$math[$get[maxExp] - $get[minExp]];15;█;░;]】]
  `,
});
//# sourceMappingURL=displayAnimalStats.js.map