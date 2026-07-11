import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addUpgradeMenuAnimalChoices',
  description: "Adds upgrade menu animal variant choices as buttons based on user's owned packs",
  params: [
    {
      name: '_animalId',
      description: "The ID of the animal to load variants for",
      type: ArgType.String,
    }
  ],
  code: `
    $jsonLoad[userPacks;$env[userProfile;userPacks]]
    $arrayUnshift[userPacks;s1;s2]

    $let[buttonsQuantity;0]

    $forOf[$getAnimalInfo[$env[_animalId];variants];variant;
      $if[$arrayIncludes[userPacks;$env[variant;packId]]==false;$continue]

      $if[$math[$get[buttonsQuantity] % 3]==0;
        $addActionRow
      ]
      $addButton[kingdragon-$env[_animalId]-$env[i]-$authorID;$env[variant;name];Secondary;$env[variant;emoji]]
      $letSum[buttonsQuantity;1]
    ;i]
  `
})