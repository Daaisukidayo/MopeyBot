export default {
  name: 'handleClearcoins',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $onlyIf[$env[userProfile;MC]>0;
      $newError[$tl[ui.clearcoins.noCash]]
    ]

    $defer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.clearcoins.warn;$separate[$env[userProfile;MC]]]]

      $addActionRow
      $addButton[confirmClearingCoins-$authorID;$tl[ui.clearcoins.buttonLabelConfirm];Success]
      $addButton[declineClearingCoins-$authorID;$tl[ui.clearcoins.buttonLabelDecline];Danger]
    ;Orange]
    $newCommandTimeout
  `
}