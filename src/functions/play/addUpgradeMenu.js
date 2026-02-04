export default {
  name: 'addUpgradeMenu',
  code: `
    $if[$env[playData]==;$return]

    $if[$env[funcCache;animals]==;
      $!jsonSet[funcCache;animals;$getAnimalsData]
    ]
    $jsonLoad[raresButtonStyle;$getGlobalVar[raresButtonStyle]]
    $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
    $jsonLoad[tierAnimals;$getGlobalVar[tierAnimals]]
    $jsonLoad[animalIDs;$env[tierAnimals;$env[playData;tier]]]

    $let[buttonsQ;0]

    $loop[$arrayLength[animalIDs];
      $let[i;$math[$env[i] - 1]]
      $let[animalID;$arrayAt[animalIDs;$get[i]]]

      $if[$get[animalID]==kingDragon;$break]

      $if[$advArrayIncludes[$jsonKeys[allRareAttemptsInfo];$get[animalID]];
        $let[chosenAnimal;$advArrayRandomValue[$env[allRareAttemptsInfo;$get[animalID]]]]
        
        $if[$get[chosenAnimal]==null;$continue]
        $let[animalID;$get[chosenAnimal]]
      ;
        $if[$getAnimalInfo[$get[animalID];isRare];$continue]
      ]

      $let[buttonIndex;$arrayFindIndex[raresButtonStyle;arr;$advArrayincludes[$env[arr;1];$get[animalID]]]]
      $let[butStyle;$default[$env[raresButtonStyle;$get[buttonIndex];0];Secondary]]

      $let[wr;$default[$env[userWardrobe;$get[animalID]];0]]
      $let[emoji;$getAnimalVariantInfo[$get[animalID];emoji;$get[wr]]]
      $let[animalName;$getAnimalVariantInfo[$get[animalID];name;$get[wr]]]
      $let[trig;$get[animalID]-upgrade_animal_play-$authorID]
      
      $if[$math[$get[buttonsQ] % 5]==0;$addActionRow]
      $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
      $letSum[buttonsQ;1]
    ;i;true]
  `
}