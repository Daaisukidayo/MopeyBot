import { ForgeClassBuilder, ParamType } from "forge.class"

export default new ForgeClassBuilder({
  name: "Rolls",
  fields: {
    "static emptyRaretryStats": { plays: 0, rares: 0, mope_coins: 0, best: null },
    "static emptySoccerStats": { plays: 0, mope_coins: 0, best: null, found: {}, last_new_at: null },

    userID: null,
    stats: {},
    history: {},
  },
  methods: {
    constructor: {
      params: [{ name: "userId", type: ParamType.String }],
      code: `
        $setField[this;userID;$env[userId]]
        $setField[this;stats;$getUserVar[rollStats;$env[userId]]]
        $setField[this;history;$getUserVar[rollHistory;$env[userId]]]
      `,
    },

    save: {
      code: `
        $setUserVar[rollStats;$getField[this;stats];$getField[this;userID]]
        $setUserVar[rollHistory;$getField[this;history];$getField[this;userID]]
      `,
    },

    statsOf: {
      params: [{ name: "game", type: ParamType.String }],
      code: `
        $return[$nullish[$jsonGet[this;stats;$env[game]];$getStatic[Rolls;$if[$isOneOf[$env[game];raretry;raretryrun];emptyRaretryStats;emptySoccerStats]]]]
      `,
    },

    historyOf: {
      params: [{ name: "game", type: ParamType.String }],
      code: `
        $return[$nullish[$jsonGet[this;history;$env[game]];$arrayOf]]
      `,
    },

    record: {
      params: [
        { name: "game", type: ParamType.String },
        { name: "roll", type: ParamType.Json },
      ],
      code: `
        $let[game;$env[game]]
        $let[isSoccer;$jsonHas[roll;item]]
        $if[$get[isSoccer];
          $jsonLoad[best;$objectOf[id;$jsonGet[roll;item];chance;$jsonGet[roll;chance]]]
        ;
          $jsonLoad[best;$jsonGet[$arraySortBy[$jsonGet[roll;rares];desc;chance];0]]
        ]

        $jsonLoad[gameStats;$callMethod[this;statsOf;$get[game]]]
        $!jsonSet[this;stats;$get[game];$env[gameStats]]
        $jsonMath[this;stats;$get[game];plays;1]
        $jsonMath[this;stats;$get[game];mope_coins;$jsonGet[roll;mope_coins]]
        $if[$get[isSoccer];
          $c[first-found time breaks collection ties]
          $let[item;$jsonGet[roll;item]]
          $if[$jsonGet[this;stats;$get[game];found;$get[item]]==;
            $!jsonSet[this;stats;$get[game];last_new_at;$jsonGet[roll;at]]
          ]
          $!jsonSet[this;stats;$get[game];found;$get[item];$math[$default[$jsonGet[this;stats;$get[game];found;$get[item]];0] + 1]]
        ;
          $jsonMath[this;stats;$get[game];rares;$jsonSize[roll;rares]]
        ]

        $if[$and[$env[best]!=;$jsonGet[best;chance]>$default[$jsonGet[this;stats;$get[game];best;chance];0]];
          $!jsonSet[best;at;$jsonGet[roll;at]]
          $!jsonSet[this;stats;$get[game];best;$env[best]]
        ]

        $c[ordinary rolls (the always-drop soccer or an empty raretry) stack onto the newest entry if it's a streak too]
        $let[isOrdinary;$if[$get[isSoccer];$checkCondition[$jsonGet[roll;chance]==1];$checkCondition[$jsonSize[roll;rares]==0]]]
        $jsonLoad[list;$callMethod[this;historyOf;$get[game]]]
        $if[$and[$get[isOrdinary];$jsonGet[list;0;count]!=];
          $jsonMath[list;0;count;1]
          $jsonMath[list;0;mope_coins;$jsonGet[roll;mope_coins]]
          $!jsonSet[list;0;at;$jsonGet[roll;at]]
        ;
          $jsonLoad[entry;$env[roll]]
          $if[$get[isOrdinary];$!jsonSet[entry;count;1]]
          $arrayUnshiftJSON[list;$env[entry]]
          $jsonLoad[list;$arraySlice[list;;0;$getGlobalVar[rollHistoryLength]]]
        ]
        $!jsonSet[this;history;$get[game];$env[list]]
      `,
    },
  },
})
