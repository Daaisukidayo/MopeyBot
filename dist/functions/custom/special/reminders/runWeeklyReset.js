"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "runWeeklyReset",
    description: "Sends weekly reward reminders. Runs at most once per ISO week, so it is safe to call more than once",
    code: `
    $calendar[Iso8601]
    $let[week;$calendarWeek]

    $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]==$get[week];$return]
    $setGlobalVar[lastCheckedWeeklyInReady;$get[week]]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userProfile;$getProfile[$env[id]]]

      $c[Only to someone who has not claimed the reward this week and wants the reminder. DMs are checked last, as it asks Discord]
      $if[$and[$jsonGet[userProfile;limiters;lastWeeklyWeek]!=$get[week];$arrayIncludes[$getUserVar[userReminders;$env[id]];1]];
        $if[$isUserDMEnabled[$env[id]];
          $sendRewardReminder[$env[id];1;$jsonGet[userProfile;language]]
        ]
      ]
    ]
  `,
});
//# sourceMappingURL=runWeeklyReset.js.map