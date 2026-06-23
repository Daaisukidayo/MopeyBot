export default {
  name: "kingdragon",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $let[animalId;$env[IID;1]]
    $let[wrIndex;$env[IID;2]]

    $switch[$get[animalId];
      $case[blackDragon;
        $let[MC;750]
        $let[successRarity;$random[1;100]]
        $let[successChance;60]

          
        $if[$get[successChance]>=$get[successRarity];
          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
            $addUpgradeMenuAnimalChoices[kingDragon]
          ;$getGlobalVar[defaultColor]]
          $interactionUpdate

          $newCommandTimeout[kingdragon]
        ;
          $sumCash[$get[MC]]
          $saveProfile[$env[userProfile]]

          $let[BD;$getAnimalVariantInfo[blackDragon;emoji;$get[wrIndex]]]
          $let[reason;$arrayRandomValue[$tl[ui.kingdragon.reasons.$get[l];$random[0;12]]]]

          $addContainer[
          $addAuthorDisplay
            $addTextDisplay[$tl[ui.kingdragon.attempt.$get[l];$get[BD];$get[reason];$separate[$get[MC]]]]
          ;$getGlobalVar[errorColor]]
          $interactionUpdate

          $!stopCommandTimeout[kingdragon]
        ]
      ]
  
      $case[kingDragon;
        $jsonLoad[colors;$getGlobalVar[kingDragonColors]]

        $let[MC;2500]
        $let[animalDisplay;$getAnimalVariantInfo[kingDragon;name;$get[wrIndex]]]
        $let[thumbnail;$getAnimalVariantInfo[kingDragon;img;$get[wrIndex]]]
        $let[color;$env[colors;$get[wrIndex]]]

        $sumCash[$get[MC]]
        $saveProfile[$env[userProfile]]

        $addContainer[
          $addAuthorDisplay
          $addSection[
            $addTextDisplay[$tl[ui.kingdragon.upgrade.$get[l];$get[animalDisplay];$separate[$get[MC]]]]
            $addThumbnail[$get[thumbnail]]
          ]
        ;$get[color]]

        $interactionUpdate
        $!stopCommandTimeout[kingdragon]
      ]

      $case[rareKingDragon;
        $let[MC;250000]
        $let[animalDisplay;$getAnimalVariantInfo[rareKingDragon;name;$get[wrIndex]]]
        $let[thumbnail;$getAnimalVariantInfo[rareKingDragon;img;$get[wrIndex]]]
        $let[color;$getGlobalVar[rareKingDragonColor]]

        $sumCash[$get[MC]]
        $saveProfile[$env[userProfile]]

        $addContainer[
          $addAuthorDisplay
          $addSection[
            $addTextDisplay[$tl[ui.kingdragon.byLuckUpgrade.$get[l];$get[animalDisplay];$separate[$get[MC]]]]
            $addThumbnail[$get[thumbnail]]
          ]
          $addTextDisplay[$tl[ui.kingdragon.rarity.$get[l];$env[rareKingDragonRarity;0];$env[rareKingDragonRarity;1]]]
        ;$get[color]]

        $interactionUpdate
        $!stopCommandTimeout[kingdragon]
      ]
    ]
  `
}