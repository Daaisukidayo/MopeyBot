import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $c[resets only run from the crons. ForgeTimers replays a missed midnight once on startup (restoredTicksLimit in index.ts), so calling them here too = a double run]

    $let[dailyCron;0 0 * * *]
    $let[weeklyCron;0 0 * * 1]

    $if[$timerExists[cron;dailyReset];
      $if[$getTimer[cron;dailyReset;cron]!=$get[dailyCron];$!rescheduleTimer[cron;dailyReset;$get[dailyCron]]]
    ;
      $setCron[$runDailyReset;$get[dailyCron];dailyReset]
    ]

    $if[$timerExists[cron;weeklyReset];
      $if[$getTimer[cron;weeklyReset;cron]!=$get[weeklyCron];$!rescheduleTimer[cron;weeklyReset;$get[weeklyCron]]]
    ;
      $setCron[$runWeeklyReset;$get[weeklyCron];weeklyReset]
    ]
  `,
})
