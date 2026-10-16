import { Command } from "@quoriel/edge"

export default new Command({
  name: "play_upgradeAnimal",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getUserVar[userPlayData]]
    $isPlaying[playData]
    
    $removeAllApex[playData]

    $jsonLoad[rewardPerRare;$getGlobalVar[playRewardPerRare]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalId;$jsonGet[IID;1]]

    $let[bonusPerUpgrade;$getGlobalVar[playRewardPerUpgrade]]
    $let[bonusPerRare;$default[$jsonGet[rewardPerRare;$get[animalId]];0]]
    $let[wrI;$default[$jsonGet[userWardrobe;$get[animalId]];0]]
    
    $let[biome;$getAnimalInfo[$get[animalId];biome]]
    $let[color;$getBiomeColor[playData;$get[biome]]]
    $let[animalName;$getAnimalInfo[$get[animalId];name;$get[wrI]]]

    $sumPlayCash[playData;$math[$get[bonusPerUpgrade] + $get[bonusPerRare]]]

    $let[heldSoccer;$jsonGet[playData;heldSoccer]]
    $if[$and[$get[heldSoccer]!=;$jsonGet[playData;isDead]==false;$jsonGet[playData;currentBiome]==$get[biome]];
      $arrayLoad[soccerData;_;$get[heldSoccer]]
      $let[keepSoccer;true]
    ;
      $!jsonDelete[playData;heldSoccer]
    ]

    $objectMerge[playData;$objectOf[currentAnimal;$get[animalId];currentBiome;$get[biome];isDead;false]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.play.upgraded.$get[l];$get[animalName]]]
      $if[$get[keepSoccer];
        $addTextDisplay[$tl[ui.play.soccer.stillHolding.$get[l];$getSoccerDisplay[$jsonGet[soccerData;0];$jsonGet[soccerData;1]]]]
      ]

      $addSeparator[Large]

      $displayAnimalStats[playData;userWardrobe]
      $if[$get[keepSoccer];
        $addHeldSoccerMenu[playData]
      ;
        $addActionsMenu[playData]
      ]

      $addSeparator[Large]
      
      $addExitButton[playData]
      $addCheats[playData]
    ;$get[color]]

    $updatePlayData[playData]
    $interactionUpdate
  `,
})
