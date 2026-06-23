export default {
  name: 'handleSnora',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[allRareAbbreviations;$getGlobalVar[allRareAbbreviations]]

    $let[separator; | ]
    
    $addContainer[
      $addTextDisplay[$codeBlock[Abbreviations  ➡️ Rare Animal]]
      $arrayForEach[$jsonEntries[$getCache[animals;tierAnimals]];entry;
        $let[tier;$env[entry;0]]

        $jsonLoad[data;$env[entry;1]]
        $jsonLoad[rareAnimalIds;$env[data;rareAnimals]]

        $if[$arrayLength[rareAnimalIds]>0;
          $arrayMap[rareAnimalIds;animalId;
            $return[$arrayJoin[$env[allRareAbbreviations;$env[animalId]];$get[separator]] ➡️ $getAnimalVariantInfo[$env[animalId];name]]
          ;fieldContent]

          $addTextDisplay[$tl[ui.snora.title.$get[l];$get[tier]]]
          $addTextDisplay[$codeBlock[$arrayJoin[fieldContent;\n]]]
        ]
      ]
      $addSeparator
      $addTextDisplay[$tl[ui.snora.or.$get[l];$get[separator];$env[allRareAbbreviations;whiteDove;0];$env[allRareAbbreviations;whiteDove;1]]]
    ;$getGlobalVar[luckyColor]]
  `
}