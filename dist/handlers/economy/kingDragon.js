"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleKingdragon",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[BD turns into KD by luck at KD's rarity (1 in 1000), devs can force the roll]
    $let[luck;$checkCondition[$if[$and[$message!=;$isDev];$message;$random[1;$getAnimalInfo[king_dragon;rarity.1]]]<=$getAnimalInfo[king_dragon;rarity.0]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
      $addUpgradeMenuAnimalChoices[$if[$get[luck];king_dragon;black_dragon];$get[luck]]
    ;$getGlobalVar[$if[$get[luck];rareKingDragonColor;defaultColor]]]

    $newCommandTimeout
  `,
});
//# sourceMappingURL=kingDragon.js.map