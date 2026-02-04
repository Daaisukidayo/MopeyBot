export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["selectMenu", "button"],
  description: "choose upgrade",
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]
    $arrayLoad[passKeys;,;devUpArrow,devDownArrow,devUpdateArrow,respawn,kingDragonUpg]

    $onlyIf[$function[
      $let[cond1;$includes[$env[values];upgrade;kingDragonUpg]]
      $let[cond2;$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]
      $return[$or[$get[cond1];$get[cond2]]]
    ]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]

    $isPlaying

    $jsonLoad[funcCache;{}]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[color;$nullish[$env[biomeColors;$env[playData;currentBiome]];$getGlobalVar[defaultColor]]]

    $let[iid;$nullish[$env[values;0];$env[IID;0]]]
    
    $switch[$get[iid];

      $case[upgrade;
        $setNewTier
        $if[$env[playData;tier]>17;
          $!jsonSet[playData;tier;1]
        ]
      ]

      $case[devUpArrow;
        $!jsonSet[playData;tier;$math[$env[playData;tier] + 1]]
        $if[$env[playData;tier]>17;
          $!jsonSet[playData;tier;1]
        ]
        $!jsonSet[playData;XP;$env[xpPerTier;$env[playData;tier];0]]
        $resetArenaData
      ]

      $case[devDownArrow;
        $!jsonSet[playData;tier;$math[$env[playData;tier] - 1]]
        $if[$env[playData;tier]<1;
          $!jsonSet[playData;tier;17]
        ]
        $!jsonSet[playData;XP;$env[xpPerTier;$env[playData;tier];0]]
        $resetArenaData
      ]

      $case[devUpdateArrow;
        $resetArenaData
      ]

    ]

    $addContainer[
      $addAuthorDisplay
      
      $if[$env[playData;isDead];
        $addTextDisplay[$tl[ui.play.chooseAnimal]]
      ;
        $addTextDisplay[$tl[ui.play.chooseUpgrade]]
      ]
      
      $if[$includes[$get[iid];kingDragonUpg];
        $let[animalID;kingDragon]
        $let[trig;$getAnimalInfo[$get[animalID];ID]-upgrade_animal_play-$authorID]
        $let[wrI;$env[userWardrobe;$get[animalID]]]
        $let[name;$getAnimalVariantInfo[$get[animalID];name;$get[wrI]]]
        $let[emoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[wrI]]]
        $let[emojisInDescription;$get[emoji]]
        $addActionRow
        $addButton[$get[trig];$get[name];Secondary;$get[emoji]]
      ;
        $addUpgradeMenu
      ]

      $addSeparator[Large]

      $addExitButton
      $addCheats
    ;$get[color]]

    $interactionUpdate
    $updatePlayData
  `
}