import { ForgeClassBuilder, ParamType } from "forge.class"

export default new ForgeClassBuilder({
  name: "UserProfile",
  fields: {
    user_id: null,
    mope_coins: 0,
    muid: -1,
    verified: false,
    tester: false,
    banned: false,
    dev_mode: 0,
    raretry_mode: 0,
    language: "$getGlobalVar[defaultLocale]",
    timezone: "Etc/UTC",
    // day of the last /daily, ISO week of the last /weekly
    rewards: {
      daily_day: -1,
      weekly_week: -1,
    },
    challenge: {
      settings: [],
      difficulty: 1,
    },
    user_packs: [],
    // /checklist: the counters only count for day (refreshChecklist zeroes them on a new one),
    // streak = days in a row w/ the reward
    checklist: {
      day: -1,
      raretry_rares: 0,
      raretryrun_rares: 0,
      claimed_day: -1,
      streak: 0,
    },
    // today's /howlucky roll, kept till tomorrow
    howlucky: {
      day: -1,
      number: 0,
      desc: 0,
    },
  },
  methods: {
    constructor: {
      params: [{ name: "userId", type: ParamType.String }],
      code: `
        $setField[this;user_id;$env[userId]]
      `,
    },

    save: {
      code: `
        $setUserVar[userProfile;$env[this];$getField[this;user_id]]
      `,
    },

    addCoins: {
      params: [{ name: "amount", type: ParamType.Number }],
      code: `
        $setField[this;mope_coins;$math[$getField[this;mope_coins] + $round[$env[amount]]]]
      `,
    },

    takeCoins: {
      params: [{ name: "amount", type: ParamType.Number }],
      code: `
        $setField[this;mope_coins;$math[$getField[this;mope_coins] - $round[$env[amount]]]]
      `,
    },

    setCoins: {
      params: [{ name: "amount", type: ParamType.Number }],
      code: `
        $setField[this;mope_coins;$round[$env[amount]]]
      `,
    },

    // also drops the streak if yesterday had no reward. no save, a stale checklist reads the same next time anyway
    refreshChecklist: {
      code: `
        $let[day;$calendarDay]
        $if[$jsonGet[this;checklist;day]!=$get[day];
          $!jsonSet[this;checklist;day;$get[day]]
          $!jsonSet[this;checklist;raretry_rares;0]
          $!jsonSet[this;checklist;raretryrun_rares;0]
        ]
        $if[$jsonGet[this;checklist;claimed_day]<$math[$get[day] - 1];$!jsonSet[this;checklist;streak;0]]
      `,
    },
  },
})
