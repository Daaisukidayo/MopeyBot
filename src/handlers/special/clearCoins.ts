import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleClearcoins",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $onlyIf[$jsonGet[userProfile;MC]>0;
      $newError[$tl[ui.clearcoins.noCash.$get[l]]]
    ]

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.clearcoins.warn.$get[l];$separate[$jsonGet[userProfile;MC]]]]

      $addActionRow
      $addButton[clearCoins-confirm-$authorID;$tl[ui.clearcoins.buttonLabelConfirm.$get[l]];Success]
      $addButton[clearCoins-decline-$authorID;$tl[ui.clearcoins.buttonLabelDecline.$get[l]];Danger]
    ;Orange]
    $newCommandTimeout
  `
})
