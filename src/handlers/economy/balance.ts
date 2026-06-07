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
        $return[$tl[$get[l];data;shopSkinPacks.$env[pack]]]
      ;packsContent]
    ;
      $arrayLoad[packsContent; ;$tl[$get[l];ui;balance.none]]
    ]

    $let[MC;$separate[$env[userProfile;MC]]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;balance.title]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;balance.mc;$get[MC]]]
      $addTextDisplay[$tl[$get[l];ui;balance.purchased]]
      $addTextDisplay[$codeBlock[$arrayJoin[packsContent;\n]]]
    ;$getGlobalVar[defaultColor]]
  `
}