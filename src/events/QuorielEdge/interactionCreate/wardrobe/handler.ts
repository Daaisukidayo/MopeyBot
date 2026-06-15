export default {
  name: "wardrobe",
  type: "interactionCreate",
  allowed: ["stringSelect"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[wardrobe;true]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[animalIds;$jsonKeys[$getCache[animalIndexes]]]

    $let[option;$env[IID;2]] $c[Containst tier number or 'all']
    $let[value;$selectMenuValues] $c[Contains animal's variant or skin pack's id]

    $switch[$env[IID;1];
      $case[tier;
        $if[$get[option]==all;  $c[If all tiers]
        
          $arrayForEach[animalIds;animalId;
            $jsonLoad[variants;$getAnimalInfo[$env[animalId];variants]]

            $loop[$arrayLength[variants];
              $let[i;$math[$env[i] - 1]]
              $let[packId;$env[variants;$get[i];packId]]

              $if[$get[packId]==$get[value];;$continue]

              $!jsonSet[userWardrobe;$env[animalId];$get[i]]

              $break
            ;i;true]
          ]
          $setUserVar[userWardrobe;$env[userWardrobe]]

          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[$get[l];ui;wardrobe.allTitle]]
            $addSeparator
            $addSkinpacksMenu[all]
          ;$getGlobalVar[defaultColor]]
          $interactionUpdate

          $addContainer[
            $addTextDisplay[$tl[$get[l];ui;wardrobe.equippedAll;$tl[$get[l];data;shopSkinPacks.$get[value]]]]
          ;$getGlobalVar[defaultColor]]

        ;  $c[If only one tier]
        
          $let[tier;$get[option]]
          $arrayLoad[content]
          
          $loop[$arrayLength[animalIds];
            $let[i;$math[$env[i] - 1]]
            $let[animalId;$arrayAt[animalIds;$get[i]]]
            $let[animalTier;$getAnimalInfo[$get[animalId];tier]]

            $if[$get[animalTier]>$get[tier];$break]
            $if[$get[animalTier]!=$get[tier];$continue]

            $jsonLoad[variants;$getAnimalInfo[$get[animalId];variants]]

            $loop[$arrayLength[variants];
              $let[j;$math[$env[j] - 1]]
              $let[emoji;$env[variants;$get[j];emoji]]
              $let[packId;$env[variants;$get[j];packId]]

              $if[$get[packId]==$get[value];;$continue]

              $!jsonSet[userWardrobe;$get[animalId];$get[j]]
              $arrayPush[content;$get[emoji]]

              $break
            ;j;true]
          ;i;true]

          $addContainer[
            $addAuthorDisplay
            $addTextDisplay[$tl[$get[l];ui;wardrobe.tierTitle;$get[tier]]]
            $addSeparator
            $addSkinpacksMenu[$get[tier]]
          ;$getGlobalVar[defaultColor]]
          $interactionUpdate

          $if[$arrayLength[content]>0;
            $setUserVar[userWardrobe;$env[userWardrobe]]

            $addContainer[
              $addTextDisplay[$tl[$get[l];ui;wardrobe.equippedTier;$get[tier];$tl[$get[l];data;shopSkinPacks.$get[value]]]]
              $addSeparator[Large]
              $addTextDisplay[# $arrayJoin[content; ]]
            ;$getGlobalVar[defaultColor]]
          ;
            $addContainer[
              $addTextDisplay[$tl[$get[l];ui;wardrobe.noSkinsInTier;$get[tier];$tl[$get[l];data;shopSkinPacks.$get[value]]]]
            ;Orange]
          ]
        ]

        $ephemeral
        $interactionFollowUp

        $newCommandTimeout[wardrobe]
      ]

      $case[animal;
        $let[animalId;$get[option]]

        $if[$env[IID;4]; $c[If equipping every animal one by one]
          $onlyIf[$getAnimalInfo[$get[animalId];ID]!=undefined;$deferUpdate]
          $!jsonSet[userWardrobe;$get[animalId];$get[variant]]
          $setUserVar[userWardrobe;$env[userWardrobe]]

          $let[i;$arrayIndexOf[animalIds;$get[animalId]]]

          $loop[-1;
            $letSum[i;1]
            $let[animalId;$arrayAt[animalIds;$get[i]]]
            $if[$getAnimalVariantInfo[$get[animalId];name;1]==undefined;;$break]
          ]

          $onlyIf[$get[animalId]!=;
            $addContainer[
              $addAuthorDisplay
              $addTextDisplay[$tl[$get[l];ui;wardrobe.everyEquipped]]
            ;$getGlobalVar[defaultColor]]
            $interactionUpdate
            $!stopCommandTimeout[wardrobe]
          ]
        ; $c[If equipping only one animal]
          $!jsonSet[userWardrobe;$get[animalId];$get[value]]
          $setUserVar[userWardrobe;$env[userWardrobe]]
        ]
        
        $animalsEmbed[$get[animalId];$env[IID;4]]
        $interactionUpdate
        $newCommandTimeout[wardrobe]
      ]
    ]
  `
}
