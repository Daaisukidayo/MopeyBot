import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'handleHowlucky',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $let[lastHLUsed;$env[userProfile;limiters;lastHLUsed]]
    $let[r;$env[userProfile;limiters;HLRandom]]

    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $let[newDayAt;$math[$parseString[$get[remHours]h$get[remMinutes]m] + $getTimestamp]]

    $if[$get[lastHLUsed]!=$day;

      $let[r;$random[0;100]]
      $!jsonSet[userProfile;limiters;lastHLUsed;$day]
      $!jsonSet[userProfile;limiters;HLRandom;$get[r]]

      $forOf[$getGlobalVar[howluckyData];data;
        $if[$get[r]>=$env[data;num];;$continue]

        $!jsonSet[userProfile;limiters;luckDesc;$env[data;desc]]
        $saveProfile[$env[userProfile]]
        $break
      ]
    ]

    $let[luckI;$env[userProfile;limiters;luckDesc]]
    $let[luckDesc;$tl[data.howlucky.$get[luckI].$get[l]]]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.howlucky.description.$get[l];$get[r];$get[luckDesc]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[ui.howlucky.footer.$get[l];$discordTimestamp[$get[newDayAt];RelativeTime]]]
    ;$getGlobalVar[luckyColor]]
  `
})