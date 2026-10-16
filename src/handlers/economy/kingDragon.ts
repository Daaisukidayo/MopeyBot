import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleKingdragon",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[The black dragon becomes the rare king dragon by its rarity (1 in 1000). A developer can give the roll]
    $let[rare;$checkCondition[$if[$and[$message!=;$isDev];$message;$random[1;$getAnimalInfo[rare_king_dragon;rarity.1]]]<=$getAnimalInfo[rare_king_dragon;rarity.0]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.kingdragon.chooseUpgrade.$get[l]]]
      $addUpgradeMenuAnimalChoices[$if[$get[rare];rare_king_dragon;black_dragon]]
    ;$getGlobalVar[$if[$get[rare];rareKingDragonColor;defaultColor]]]

    $newCommandTimeout
  `,
})
