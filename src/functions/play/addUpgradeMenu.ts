export default {
  name: 'addUpgradeMenu',
  code: `
    $if[$env[playData]==;$return]

    $jsonLoad[raresButtonStyle;$getGlobalVar[raresButtonStyle]]
    $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
    $jsonLoad[animalIds;$dump[$getGlobalVar[tierAnimals];$env[playData;tier];allAnimals]]

    $let[buttonsQ;0]

    $loop[$arrayLength[animalIds];
      $let[animalId;$arrayAt[animalIds;$math[$env[i] - 1]]]

      $if[$get[animalId]==kingDragon;$break]

      $if[$advArrayIncludes[$jsonKeys[allRareAttemptsInfo];$get[animalId]];
        $jsonLoad[groupData;$env[allRareAttemptsInfo;$get[animalId]]]
        $jsonLoad[pool;$env[groupData;pool]]
        $let[chosenAnimal;null]
        
        $c[Checks if any of the rare ones have fallen in the pool]
        $loop[$arrayLength[pool];
          $jsonLoad[item;$arrayAt[pool;$math[$env[j] - 1]]]
          
          $if[$getAnimalInfo[$env[item;id];isRare];
            $let[roll;$random[1;$env[groupData;total]]]
            $if[$get[roll]<=$env[item;rarity];
              $let[chosenAnimal;$env[item;id]]
              $break
            ]
          ]
        ;j;true]
        
        $c[If rare is not dropped, common is used as fallback]
        $if[$get[chosenAnimal]==null;
          $let[chosenAnimal;$env[groupData;common]]
        ]

        $if[$and[$includes[$get[chosenAnimal];shop];$advArrayIncludes[$env[userProfile;userPacks];lockedSP]==false];$continue]
        
        $c[If in the end nothing is selected (chance "empty"), hides the button]
        $if[$get[chosenAnimal]==null;$continue]
        $let[animalId;$get[chosenAnimal]]
      ;
        $c[If the animal is not on the luck list and it is rare in itself - pass]
        $if[$getAnimalInfo[$get[animalId];isRare];$continue]
      ]
      $c[--------------------------------------------]

      $let[buttonIndex;$arrayFindIndex[raresButtonStyle;arr;$advArrayincludes[$env[arr;1];$get[animalId]]]]
      $let[butStyle;$default[$env[raresButtonStyle;$get[buttonIndex];0];Secondary]]

      $let[wr;$default[$env[userWardrobe;$get[animalId]];0]]
      $let[emoji;$getAnimalVariantInfo[$get[animalId];emoji;$get[wr]]]
      $let[animalName;$getAnimalVariantInfo[$get[animalId];name;$get[wr]]]
      $let[trig;$get[animalId]-upgrade_animal_play-$authorID]
      
      $if[$math[$get[buttonsQ] % 5]==0;$addActionRow]
      $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
      $letSum[buttonsQ;1]
    ;i;true]
  `
}