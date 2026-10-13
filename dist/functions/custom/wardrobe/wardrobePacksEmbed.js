"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "wardrobePacksEmbed",
    description: "Generates the choice of a skin pack to equip on every animal of the tier, or on all animals.",
    params: [
        {
            name: "tier",
            description: "The tier, or 'all'",
            type: forgescript_1.ArgType.String
        }
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$if[$env[tier]==all;$tl[ui.wardrobe.allTitle.$get[l]];$tl[ui.wardrobe.tierTitle.$get[l];$env[tier]]]]
      $addSeparator
      $addSkinpacksMenu[$env[tier]]
      $addWardrobeBackButton[$if[$env[tier]==all;menu;pack]]
    ;$getGlobalVar[defaultColor]]
  `
});
//# sourceMappingURL=wardrobePacksEmbed.js.map