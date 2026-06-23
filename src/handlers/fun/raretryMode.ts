export default [{
  name: 'handleRaretrymode',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[modes;$getGlobalVar[raretryModes]]

    $raretrymodeEmbed
    $newCommandTimeout
  `
},{
  name: 'raretrymodeEmbed',
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title.$get[l]]]

      $loop[$arrayLength[modes];
        $let[i;$math[$env[i] - 1]]
        $let[modeI;$arrayAt[modes;$get[i]]]
        $let[mode;$tl[data.raretryModes.$get[modeI].$get[l]]]
        $if[$math[$get[i] % 3]==0;
          $addActionRow
        ]

        $addButton[rtMode-$get[modeI]-$authorID;$get[mode];Success;;$checkCondition[$env[userProfile;rtMode]==$get[modeI]]]
      ;i;true]
    ;$getGlobalVar[luckyColor]]
  `
}]