"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleDaily',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $let[MC;$getGlobalVar[dailyReward]]

    $let[lastDay;$default[$env[userProfile;limiters;lastDailyDay];-1]]
    $let[day;$calendarDay]

    $let[remHours;$sub[24;$hour]]
    $let[remMinutes;$sub[60;$minute]]

    $let[remainingTimeUnix;$parseString[$get[remHours]h$get[remMinutes]m]]

    $if[$env[userProfile;devMode]==0;
      $onlyIf[$get[day]!=$get[lastDay];
        $newCooldown[$get[remainingTimeUnix]]
      ]
    ]

    $defer

    $!jsonSet[userProfile;limiters;lastDailyDay;$get[day]]
  
    $sumCash[$get[MC]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;daily.description;$separate[$get[MC]]]]
    ;$getGlobalVar[defaultColor]]
  `
};
//# sourceMappingURL=daily.js.map