"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "wardrobePacksEmbed",
    description: "the pick of a skin pack to put on every animal in the tier, or on all of them",
    params: [
        {
            name: "tier",
            description: "the tier, or 'all'",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "page",
            description: "the page of packs, 1 by default",
            type: forgescript_1.ArgType.Number,
            required: false,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$if[$env[tier]==all;$tl[ui.wardrobe.allTitle.$get[l]];$tl[ui.wardrobe.tierTitle.$get[l];$env[tier]]]]
      $addSeparator
      $addSkinpacksMenu[$env[tier];$nullish[$env[page];1]]
      $addWardrobeBackButton[$if[$env[tier]==all;menu;pack]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=wardrobePacksEmbed.js.map