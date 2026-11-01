"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "wardrobeTierEmbed",
    description: "the wardrobe tier pick, then the tier's skin packs or its animals",
    params: [
        {
            name: "mode",
            description: "what the tier's picked for: 'pack' (one pack for the whole tier) or 'animal' (one animal in it)",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $let[l;$jsonGet[userProfile;language]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.wardrobe.tierMenuTitle.$get[l]]]

      $addActionRow
      $addStringSelectMenu[wardrobe-chooseTier-$env[mode]-$authorID;$tl[ui.wardrobe.tierPlaceholder.$get[l]]]
      $arrayForEach[$arrayRange[1;17];tier;
        $addOption[$tl[ui.wardrobe.tierOption.$get[l];$env[tier]];;$env[tier]]
      ]
      $addWardrobeBackButton[menu]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=wardrobeTierEmbed.js.map