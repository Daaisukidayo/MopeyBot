"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "runWeeklyReset",
    description: "sends the weekly reward reminders. runs at most once per ISO week, so calling it twice is fine",
    code: `
    $calendar[Iso8601]
    $let[week;$calendarWeek]

    $if[$getGlobalVar[lastCheckedWeeklyInReady;-1]==$get[week];$return]
    $setGlobalVar[lastCheckedWeeklyInReady;$get[week]]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userProfile;$getProfile[$env[id]]]

      $c[only folks who haven't claimed this week and want the reminder. check DMs last bc that hits Discord]
      $if[$and[$jsonGet[userProfile;rewards;weekly_week]!=$get[week];$arrayIncludes[$getUserVar[userReminders;$env[id]];1]];
        $if[$isUserDMEnabled[$env[id]];
          $sendRewardReminder[$env[id];1;$jsonGet[userProfile;language]]
        ]
      ]
    ]
  `,
});
//# sourceMappingURL=runWeeklyReset.js.map