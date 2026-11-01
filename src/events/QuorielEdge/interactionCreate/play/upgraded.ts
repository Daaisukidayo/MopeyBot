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

    $jsonLoad[playData;$getPlayData]
    $isPlaying[playData]

    $jsonLoad[userWardrobe;$getUserVar[userWardrobe]]

    $let[animalId;$jsonGet[IID;1]]

    $let[bonusPerUpgrade;$getGlobalVar[playRewardPerUpgrade]]
    $c[rares pay playRewardPerChance x N (1 in N in their luck group), like raretryrun. group total = the common's, old event animals w/o one use their own]
    $c[only menu picks count: BD's apex upgrade into KD stays in tier 17, so no rare bonus]
    $let[bonusPerRare;0]
    $if[$and[$getAnimalInfo[$get[animalId];isRare]==true;$jsonGet[playData;tier]<$getAnimalInfo[$get[animalId];tier]];
      $let[common;$getAnimalInfo[$get[animalId];common]]
      $let[poolTotal;$if[$isOneOf[$get[common];undefined;];$getAnimalInfo[$get[animalId];rarity.1];$getAnimalInfo[$get[common];rarity.1]]]
      $let[bonusPerRare;$round[$math[$getGlobalVar[playRewardPerChance] * $get[poolTotal] / $getAnimalInfo[$get[animalId];rarity.0]]]]
    ]
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
})
