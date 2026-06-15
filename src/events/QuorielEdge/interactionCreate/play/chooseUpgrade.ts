export default {
  name: "play_chooseUpgrade",
  type: "interactionCreate",
  allowed: ["stringSelect", "button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[values;-;$selectMenuValues]

    $c[
      $onlyIf[$or[$includes[$env[values];upgrade;kingDragonUpg];true]]
    ]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]
    
    $jsonLoad[playData;$getUserVar[userPlayData]]

    $isPlaying

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]
    $jsonLoad[biomeColors;$getGlobalVar[biomeColors]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $let[color;$nullish[$env[biomeColors;$env[playData;currentBiome]];$getGlobalVar[defaultColor]]]

    $let[iid;$nullish[$env[values;0];$env[IID;1]]]
    
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
        $addTextDisplay[$tl[$get[l];ui;play.chooseAnimal]]
      ;
        $addTextDisplay[$tl[$get[l];ui;play.chooseUpgrade]]
      ]
      
      $if[$includes[$get[iid];kingDragonUpg];
        $let[animalId;kingDragon]
        $let[trig;play_upgradeAnimal-$get[animalId]-$authorID]
        $let[wrI;$env[userWardrobe;$get[animalId]]]
        $let[name;$getAnimalVariantInfo[$get[animalId];name;$get[wrI]]]
        $let[emoji;$getAnimalVariantInfo[$get[animalId];emoji;$get[wrI]]]
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