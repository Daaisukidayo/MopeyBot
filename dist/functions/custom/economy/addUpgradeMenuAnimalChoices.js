"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "addUpgradeMenuAnimalChoices",
    description: "Adds upgrade menu animal variant choices as buttons based on user's owned packs",
    params: [
        {
            name: "animalId",
            description: "The ID of the animal to load variants for",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $jsonLoad[userPacks;$jsonGet[userProfile;userPacks]]
    $arrayUnshift[userPacks;s1;s2]

    $let[buttonsQuantity;0]

    $c[Only the skins of the owned packs, three buttons in a row]
    $arrayForEach[$getAnimalInfo[$env[animalId];variants];variant;
      $if[$arrayIncludes[userPacks;$jsonGet[variant;packId]];
        $if[$math[$get[buttonsQuantity] % 3]==0;
          $addActionRow
        ]
        $addButton[kingdragon-$env[animalId]-$env[i]-$authorID;$jsonGet[variant;name];Secondary;$jsonGet[variant;emoji]]
        $letSum[buttonsQuantity;1]
      ]
    ;i]
  `,
});
//# sourceMappingURL=addUpgradeMenuAnimalChoices.js.map