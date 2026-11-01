import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "upgradeProfile",
  params: [
    {
      name: "profileVar",
      description: "var w/ the old profile",
      type: ArgType.String,
    },
    {
      name: "userId",
      description: "whose profile it is",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[profile;$env[profileVar]]
    $let[id;$env[userId]]

    $c[rename the old keys by the class static oldKeys]
    $jsonLoad[oldKeys;$getStatic[UserProfile;oldKeys]]
    $arrayForEach[$jsonEntries[oldKeys];pair;
      $if[$jsonHas[profile;$jsonGet[pair;0]];
        $!jsonSet[profile;$jsonGet[pair;1];$jsonGet[profile;$jsonGet[pair;0]]]
        $!jsonDelete[profile;$jsonGet[pair;0]]
      ]
    ]

    $c[ID is just the record's id, onSlowmode and hadAnn never did anything]
    $!jsonDelete[profile;ID]
    $!jsonDelete[profile;onSlowmode]
    $!jsonDelete[profile;hadAnn]
    $!jsonSet[profile;user_id;"$get[id]"]

    $c[limiters got split up, daily + weekly go to rewards]
    $!jsonSet[profile;rewards;$objectOf[daily_day;$default[$jsonGet[profile;limiters;lastDailyDay];-1];weekly_week;$default[$jsonGet[profile;limiters;lastWeeklyWeek];-1]]]

    $c[the checklist was 3 vars of its own. counters date from the last daily reset bc it zeroed them. done = full counter now, so a quest done that day gets maxed out (the old claim zeroed it)]
    $let[day;$getGlobalVar[lastCheckedDayInReady;-1]]
    $let[raretry;$if[$jsonGet[profile;limiters;lastDailyRaretry]==$get[day];$getGlobalVar[maxRaretryRares];$default[$getUserVar[caughtRaresInRaretry;$get[id]];0]]]
    $let[raretryrun;$if[$jsonGet[profile;limiters;lastDailyRaretryrun]==$get[day];$getGlobalVar[maxRaretryrunRares];$default[$getUserVar[caughtRaresInRaretryrun;$get[id]];0]]]
    $!jsonSet[profile;checklist;$objectOf[day;$get[day];raretry_rares;$get[raretry];raretryrun_rares;$get[raretryrun];claimed_day;$default[$jsonGet[profile;limiters;lastClaimedDay];-1];streak;$default[$getUserVar[dailyStreak;$get[id]];0]]]

    $c[only there if howlucky was ever used, the backfill covers the rest]
    $if[$jsonHas[profile;limiters;lastHLUsed];
      $!jsonSet[profile;howlucky;$objectOf[day;$jsonGet[profile;limiters;lastHLUsed];number;$jsonGet[profile;limiters;HLRandom];desc;$jsonGet[profile;limiters;luckDesc]]]
    ]
    $!jsonDelete[profile;limiters]
    $!jsonSet[profile;__class;UserProfile]
  `,
})
