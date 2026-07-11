import { ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: 'addUpgradeMenu',
  deacription: "Adds upgrade menu for a player's play session",
  code: `
    $if[$env[playData]==;$return]

    $getCache[animals;tierAnimals;tierAnimals]
    $jsonLoad[raresButtonStyle;$getGlobalVar[raresButtonStyle]]
    $jsonLoad[allRareAttemptsInfo;$getUserVar[allRareAttemptsInfo]]
    $jsonLoad[animalIds;$env[tierAnimals;$env[playData;tier];allAnimals]]

    $let[buttonsQ;0]

    $forOf[animalIds;animalId;
      $if[$env[animalId]==kingDragon;$break]

      $if[$arrayIncludes[$jsonKeys[allRareAttemptsInfo];$env[animalId]];
        $jsonLoad[groupData;$env[allRareAttemptsInfo;$env[animalId]]]
        $let[chosenAnimal;null]
        $let[roll;$random[1;$env[groupData;total]]]
        $c[Checks if any of the rare ones have fallen in the pool]
        $forOf[$env[groupData;pool];item;
          $if[$get[roll]<=$env[item;rarity];;$continue]
          $let[chosenAnimal;$env[item;id]]
          $break
        ]
        
        $c[If rare is not dropped, common is used as fallback]
        $if[$get[chosenAnimal]==null;
          $let[chosenAnimal;$env[groupData;common]]
        ]

        $if[$and[$includes[$get[chosenAnimal];shop];$arrayIncludes[$env[userProfile;userPacks];lockedSP]==false];$continue]
        
        $c[If in the end nothing is selected (chance "empty"), hides the button]
        $if[$get[chosenAnimal]==null;$continue]
        $!jsonSet[animalId;$get[chosenAnimal]]
      ;
        $c[If the animal is not on the luck list and it is rare in itself - pass]
        $if[$getAnimalInfo[$env[animalId];isRare];$continue]
      ]
      $c[--------------------------------------------]

      $let[buttonIndex;$arrayFindIndex[raresButtonStyle;arr;$arrayIncludes[$env[arr;1];$env[animalId]]]]
      $let[butStyle;$default[$env[raresButtonStyle;$get[buttonIndex];0];Secondary]]

      $let[wr;$default[$env[userWardrobe;$env[animalId]];0]]
      $let[emoji;$getAnimalInfo[$env[animalId];emoji;$get[wr]]]
      $let[animalName;$getAnimalInfo[$env[animalId];name;$get[wr]]]
      $let[trig;play_upgradeAnimal-$env[animalId]-$authorID]
      
      $if[$math[$get[buttonsQ] % 5]==0;$addActionRow]
      $addButton[$get[trig];$get[animalName];$get[butStyle];$get[emoji]]
      $letSum[buttonsQ;1]
    ]
  `
})