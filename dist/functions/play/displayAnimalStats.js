"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'displayAnimalStats',
    code: `
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]
    $let[l;$env[userProfile;language]]

    $let[animalId;$env[playData;currentAnimal]]
    $let[wardrobeIndex;$default[$env[userWardrobe;$get[animalId]];0]]
    $let[emoji;$getAnimalVariantInfo[$get[animalId];emoji;$get[wardrobeIndex]]]
    $let[animalName;$getAnimalVariantInfo[$get[animalId];name;$get[wardrobeIndex]]]
    $let[exp;$env[playData;XP]]
    $let[tier;$env[playData;tier]]
    $let[minExp;$env[xpPerTier;$get[tier];0]]
    $let[maxExp;$env[xpPerTier;$get[tier];1]]
    $let[MC;$env[playData;MC]]
    $let[thumbnail;$getAnimalVariantInfo[$get[animalId];img;$get[wardrobeIndex]]]

    $addSection[
      $addTextDisplay[## $get[emoji] $get[animalName]]
      $addTextDisplay[## $separate[$get[MC]]$getGlobalVar[emoji]]
      $addTextDisplay[## $abbreviateNumber[$get[exp]] / $abbreviateNumber[$get[maxExp]] $tl[$get[l];ui;play.xp]]
      $addThumbnail[$get[thumbnail]]
    ]
    $addTextDisplay[### 【$bar[$math[$get[exp] - $get[minExp]];$math[$get[maxExp] - $get[minExp]];15;█;░;]】]
  `
};
//# sourceMappingURL=displayAnimalStats.js.map