"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "runDailyReset",
    description: "Resets the daily limits and sends daily reward reminders. Runs at most once per day, so it is safe to call more than once",
    code: `
    $calendar[Iso8601]
    $let[day;$calendarDay]

    $if[$getGlobalVar[lastCheckedDayInReady;-1]==$get[day];$return]
    $setGlobalVar[lastCheckedDayInReady;$get[day]]

    $arrayForEach[$getGlobalVar[allUserIDs];id;
      $jsonLoad[userProfile;$getProfile[$env[id]]]

      $deleteUserVar[caughtRaresInRaretryrun;$env[id]]
      $deleteUserVar[caughtRaresInRaretry;$env[id]]

      $c[Only to someone who has not claimed the reward today and wants the reminder. DMs are checked last, as it asks Discord]
      $if[$and[$jsonGet[userProfile;limiters;lastDailyDay]!=$get[day];$arrayIncludes[$getUserVar[userReminders;$env[id]];0]];
        $if[$isUserDMEnabled[$env[id]];
          $sendRewardReminder[$env[id];0;$jsonGet[userProfile;language]]
        ]
      ]
    ]
  `,
});
//# sourceMappingURL=runDailyReset.js.map