import { Command } from "@quoriel/edge"

export default new Command({
  name: "kingdragon",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $addCooldown[kingdragon;true]

    $let[animalId;$jsonGet[IID;1]]
    $let[wrIndex;$jsonGet[IID;2]]

    $c[A black dragon becomes the king dragon 60% of the time, otherwise it gets some coins]
    $if[$get[animalId]==black_dragon;
      $if[$random[1;100]<=60;
        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
          $addUpgradeMenuAnimalChoices[king_dragon]
        ;$getGlobalVar[defaultColor]]
        $interactionUpdate
        $newCommandTimeout[kingdragon]
      ;
        $let[MC;750]
        $sumCash[$get[MC]]
        $saveProfile[$env[userProfile]]

        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.kingdragon.attempt.$get[l];$getAnimalInfo[black_dragon;emoji;$get[wrIndex]];$arraySample[$tl[ui.kingdragon.reasons.$get[l]]];$separate[$get[MC]]]]
        ;$getGlobalVar[errorColor]]
        $interactionUpdate
        $!stopCommandTimeout[kingdragon]
      ]
      $stop
    ]

    $c[The king dragon, or the rare one got by luck]
    $onlyIf[$isOneOf[$get[animalId];king_dragon;rare_king_dragon]]
    $let[rare;$checkCondition[$get[animalId]==rare_king_dragon]]
    $let[MC;$if[$get[rare];250000;2500]]
    $sumCash[$get[MC]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.kingdragon.$if[$get[rare];byLuckUpgrade;upgrade].$get[l];$getAnimalInfo[$get[animalId];name;$get[wrIndex]];$separate[$get[MC]]]]
        $addThumbnail[$animalImage[$get[animalId];$get[wrIndex]]]
      ]
      $if[$get[rare];
        $addTextDisplay[$tl[ui.kingdragon.rarity.$get[l];$getAnimalInfo[rare_king_dragon;rarity.0];$getAnimalInfo[rare_king_dragon;rarity.1]]]
      ]
    ;$if[$get[rare];$getGlobalVar[rareKingDragonColor];$jsonGet[$getGlobalVar[kingDragonColors];$get[wrIndex]]]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `,
})
