export default [{
  name: 'handleRaretrymode',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[modes;$dump[$getGlobalVar[raretryVarData];modes]]

    $raretrymodeEmbed

    $newCommandTimeout
  `
},{
  name: 'raretrymodeEmbed',
  code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.raretrymode.title]]

      $loop[$arrayLength[modes];
        $let[i;$math[$env[i] - 1]]
        $let[modeI;$arrayAt[modes;$get[i]]]
        $let[mode;$tl[data.raretryModes.$get[modeI]]]
        $if[$math[$get[i] % 3]==0;
          $addActionRow
        ]

        $addButton[$get[modeI]-rtMode-$authorID;$get[mode];Success;;$checkCondition[$env[userProfile;rtMode]==$get[modeI]]]
      ;i;true]
    ;$getGlobalVar[luckyColor]]
  `
}]