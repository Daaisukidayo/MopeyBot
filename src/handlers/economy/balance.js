export default {
  name: 'handleBalance',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[userPacks;$env[userProfile;userPacks]]

    $if[$arrayLength[userPacks]>0;
      $arrayMap[userPacks;pack;
        $return[$tl[data.shopSkinPacks.$env[pack]]]
      ;packsContent]
    ;
      $arrayLoad[packsContent; ;$tl[ui.balance.none]]
    ]

    $let[MC;$separate[$env[userProfile;MC]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.balance.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.balance.mc;$get[MC]]]
      $addTextDisplay[$tl[ui.balance.purchased]]
      $addTextDisplay[$codeBlock[$arrayJoin[packsContent;\n]]]
    ;$getGlobalVar[defaultColor]]
    $send
  `
}