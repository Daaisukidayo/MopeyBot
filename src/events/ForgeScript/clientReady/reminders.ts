import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: "clientReady",
  code: `
    $c[Resets run only from the crons: ForgeTimers replays a midnight missed while offline once on startup (cronConfig.restoredTicksLimit in index.ts). Calling them here too ran them twice, both passing the day check]

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
