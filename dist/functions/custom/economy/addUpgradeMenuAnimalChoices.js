"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addUpgradeMenuAnimalChoices",
    description: "adds the upgrade menu skin buttons for the skins the user owns",
    params: [
        {
            name: "animalId",
            description: "the animal whose skins to show",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "luck",
            description: "KD rolled by luck, its buttons get a -luck tag",
            type: forgescript_1.ArgType.Boolean,
            required: false,
        },
    ],
    code: `
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]

    $let[buttonsQuantity;0]

    $c[only owned skins, free or bought, 3 buttons per row]
    $arrayForEach[$getAnimalInfo[$env[animalId];skins];skin;
      $if[$or[$arrayIncludes[freePacks;$jsonGet[skin;packId]];$arrayIncludes[userSkins;$jsonGet[skin;id]]];
        $if[$math[$get[buttonsQuantity] % 5]==0;
          $addActionRow
        ]
        $addButton[kingdragon-$env[animalId]-$env[i]-$authorID$if[$env[luck]==true;-luck];$jsonGet[skin;name];Secondary;$jsonGet[skin;emoji]]
        $letSum[buttonsQuantity;1]
      ]
    ;i]
  `,
});
//# sourceMappingURL=addUpgradeMenuAnimalChoices.js.map