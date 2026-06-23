export default {
  name: 'handleBalance',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[userPacks;$env[userProfile;userPacks]]

    $if[$arrayLength[userPacks]>0;
      $arrayMap[userPacks;pack;
        $return[$tl[data.shopSkinPacks.$env[pack].$get[l]]]
      ;packsContent]
    ;
      $arrayLoad[packsContent; ;$tl[ui.balance.none.$get[l]]]
    ]

    $let[MC;$separate[$env[userProfile;MC]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.balance.title.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.balance.mc.$get[l];$get[MC]]]
      $addTextDisplay[$tl[ui.balance.purchased.$get[l]]]
      $addTextDisplay[$codeBlock[$arrayJoin[packsContent;\n]]]
    ;$getGlobalVar[defaultColor]]
  `
}