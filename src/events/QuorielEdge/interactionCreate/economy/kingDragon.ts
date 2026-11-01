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

    $c[60% to become KD, else some coins]
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
        $callMethod[userProfile;addCoins;$get[MC]]
        $callMethod[userProfile;save]

        $addContainer[
          $addAuthorDisplay
          $addTextDisplay[$tl[ui.kingdragon.attempt.$get[l];$getAnimalInfo[black_dragon;emoji;$get[wrIndex]];$arraySample[$tl[ui.kingdragon.reasons.$get[l]]];$separate[$get[MC]]]]
        ;$getGlobalVar[errorColor]]
        $interactionUpdate
        $!stopCommandTimeout[kingdragon]
      ]
      $stop
    ]

    $c[KD, the lucky one if the button ends in -luck]
    $onlyIf[$get[animalId]==king_dragon]
    $let[luck;$checkCondition[$jsonGet[IID;4]==luck]]
    $let[MC;$if[$get[luck];250000;2500]]
    $callMethod[userProfile;addCoins;$get[MC]]
    $callMethod[userProfile;save]

    $addContainer[
      $addAuthorDisplay
      $addSection[
        $addTextDisplay[$tl[ui.kingdragon.$if[$get[luck];byLuckUpgrade;upgrade].$get[l];$getAnimalInfo[$get[animalId];name;$get[wrIndex]];$separate[$get[MC]]]]
        $addThumbnail[$animalImage[$get[animalId];$get[wrIndex]]]
      ]
      $if[$get[luck];
        $addTextDisplay[$tl[ui.kingdragon.rarity.$get[l];$getAnimalInfo[king_dragon;rarity.0];$getAnimalInfo[king_dragon;rarity.1]]]
      ]
    ;$if[$get[luck];$getGlobalVar[rareKingDragonColor];$jsonGet[$getGlobalVar[kingDragonColors];$get[wrIndex]]]]

    $interactionUpdate
    $!stopCommandTimeout[kingdragon]
  `,
})
