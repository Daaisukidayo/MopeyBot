"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
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
    $let[luckDesc;$tl[$get[l];data;howlucky.$get[luckI]]]
    
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;howlucky.description;$get[r];$get[luckDesc]]]
      $addSeparator[Large]
      $addTextDisplay[$tl[$get[l];ui;howlucky.footer;$discordTimestamp[$get[newDayAt];RelativeTime]]]
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=howlucky.js.map