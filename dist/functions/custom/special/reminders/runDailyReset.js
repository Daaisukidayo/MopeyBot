"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "runDailyReset",
    description: "sends the daily reward reminders. runs at most once a day, so calling it twice is fine",
    code: `
    $calendar[Iso8601]
    $let[day;$calendarDay]

    $if[$getGlobalVar[lastCheckedDayInReady;-1]==$get[day];$return]
    $setGlobalVar[lastCheckedDayInReady;$get[day]]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userProfile;$getProfile[$env[id]]]

      $c[only folks who haven't claimed today and want the reminder. check DMs last bc that hits Discord]
      $if[$and[$jsonGet[userProfile;rewards;daily_day]!=$get[day];$arrayIncludes[$getUserVar[userReminders;$env[id]];0]];
        $if[$isUserDMEnabled[$env[id]];
          $sendRewardReminder[$env[id];0;$jsonGet[userProfile;language]]
        ]
      ]
    ]
  `,
});
//# sourceMappingURL=runDailyReset.js.map