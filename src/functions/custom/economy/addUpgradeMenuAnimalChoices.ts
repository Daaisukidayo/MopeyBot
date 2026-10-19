import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addUpgradeMenuAnimalChoices",
  description: "Adds upgrade menu animal skin choices as buttons based on user's owned packs",
  params: [
    {
      name: "animalId",
      description: "The ID of the animal to load skins for",
      type: ArgType.String,
    },
  ],
  code: `
    $jsonLoad[userPacks;$jsonGet[userProfile;userPacks]]
    $arrayUnshift[userPacks;s1;s2]

    $let[buttonsQuantity;0]

    $c[Only the skins of the owned packs, three buttons in a row]
    $arrayForEach[$getAnimalInfo[$env[animalId];skins];skin;
      $if[$arrayIncludes[userPacks;$jsonGet[skin;packId]];
        $if[$math[$get[buttonsQuantity] % 3]==0;
          $addActionRow
        ]
        $addButton[kingdragon-$env[animalId]-$env[i]-$authorID;$jsonGet[skin;name];Secondary;$jsonGet[skin;emoji]]
        $letSum[buttonsQuantity;1]
      ]
    ;i]
  `,
})
