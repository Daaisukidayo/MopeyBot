"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "wardrobeMenuEmbed",
    description: "the wardrobe start menu: one by one, one animal, a tier or all animals",
    code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.menuTitle.$get[l]]]

      $addActionRow
      $addStringSelectMenu[wardrobe-menu-$authorID;$tl[ui.wardrobe.menuPlaceholder.$get[l]]]
      $arrayForEach[$arrayOf[new;tier;all];option;
        $addOption[$tl[ui.wardrobe.menuOptions.$env[option].label.$get[l]];$tl[ui.wardrobe.menuOptions.$env[option].description.$get[l]];$env[option]]
      ]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=wardrobeMenuEmbed.js.map