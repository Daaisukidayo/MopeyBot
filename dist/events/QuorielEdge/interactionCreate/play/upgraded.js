"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "play_upgradeAnimal",
    type: "interactionCreate",
    allowed: ["button"],
    code: `
    $arrayLoad[IID;-;$customID]
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $jsonLoad[rewardPerRare;$getGlobalVar[playRewardPerRare]]
    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalId;$jsonGet[IID;1]]

    $let[bonusPerUpgrade;$getGlobalVar[playRewardPerUpgrade]]
    $let[bonusPerRare;$default[$jsonGet[rewardPerRare;$get[animalId]];0]]
    $let[wrI;$default[$jsonGet[userWardrobe;$get[animalId]];0]]
    
    $let[biome;$getAnimalInfo[$get[animalId];biome]]
    $let[color;$getBiomeColor[playData;$get[biome]]]
    $let[animalName;$getAnimalInfo[$get[animalId];name;$get[wrI]]]

    $let[keepSoccer;$callMethod[playData;evolveInto;$get[animalId];$math[$get[bonusPerUpgrade] + $get[bonusPerRare]];$get[wrI]]]
    $if[$get[keepSoccer];$arrayLoad[soccerData;_;$jsonGet[playData;held_soccer]]]

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
});
//# sourceMappingURL=upgraded.js.map