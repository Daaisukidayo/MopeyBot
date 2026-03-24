export default {
  name: 'handleHowlucky',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer

    $let[lastHLUsed;$env[userProfile;limiters;lastHLUsed]]
    $let[r;$env[userProfile;limiters;HLRandom]]

    $if[$get[lastHLUsed]!=$day;

      $let[r;$random[0;100]]
      $!jsonSet[userProfile;limiters;lastHLUsed;$day]
      $!jsonSet[userProfile;limiters;HLRandom;$get[r]]

      $jsonLoad[data;$getGlobalVar[howluckyData]]

      $loop[$arrayLength[data];
        $let[i;$math[$env[i] - 1]]
        $jsonLoad[d;$arrayAt[data;$get[i]]]

        $if[$get[r]>=$env[d;num];
          $!jsonSet[userProfile;limiters;luckDesc;$env[d;desc]]
          $saveProfile
          $break
        ]
      ;i;true]
    ]

    $let[luckI;$env[userProfile;limiters;luckDesc]]
    $let[luckDesc;$tl[data.howlucky.$get[luckI]]]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.howlucky.description;$get[r];$get[luckDesc]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.howlucky.footer]]
    ;$getGlobalVar[luckyColor]]
    $send
  `
}