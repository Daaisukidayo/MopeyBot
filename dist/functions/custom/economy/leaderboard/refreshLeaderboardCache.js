"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "refreshLeaderboardCache",
    description: "rebuilds the cached leaderboard tables: coins and the roll game tables (see leaderboardTypes)",
    code: `
    $c[one row per user w/ everything a table sorts by: coins, rares caught, rarest soccers, collection]
    $arrayMap[$getGlobalVar[allUserIDs];id;
      $jsonLoad[profile;$getProfile[$env[id]]]
      $jsonLoad[stats;$getUserVar[rollStats;$env[id]]]
      $jsonLoad[row;$objectPick[profile;mope_coins;user_id;muid]]
      $let[collection;0]
      $let[collectionAt;0]
      $arrayForEach[$getGlobalVar[rollGames];game;
        $if[$isOneOf[$env[game];raretry;raretryrun];
          $!jsonSet[row;$env[game];$default[$jsonGet[stats;$env[game];rares];0]]
          $!jsonSet[row;$env[game]_plays;$default[$jsonGet[stats;$env[game];plays];0]]
        ;
          $!jsonSet[row;$env[game];$default[$jsonGet[stats;$env[game];best;chance];0]]
          $!jsonSet[row;$env[game]_item;$jsonGet[stats;$env[game];best;id]]
          $!jsonSet[row;$env[game]_at;$default[$jsonGet[stats;$env[game];best;at];0]]
          $letSum[collection;$jsonSize[stats;$env[game];found]]
          $let[collectionAt;$max[$get[collectionAt];$default[$jsonGet[stats;$env[game];last_new_at];0]]]
        ]
      ]
      $!jsonSet[row;collection;$get[collection]]
      $!jsonSet[row;collection_at;$get[collectionAt]]
      $return[$env[row]]
    ;players]

    $c[tables only keep users w/ a value, highest first, ties go to the lower tie key (fewer plays or earlier). coins keeps everyone]
    $arrayForEach[$jsonEntries[$getGlobalVar[leaderboardTypes]];table;
      $let[type;$jsonGet[table;0]]
      $let[key;$jsonGet[table;1;value]]
      $let[tie;$jsonGet[table;1;tie]]
      $if[$jsonGet[table;1;everyone]==true;
        $jsonLoad[rows;$env[players]]
      ;
        $arrayFilter[players;player;$jsonGet[player;$get[key]]>0;rows]
      ]
      $if[$get[tie]!=;$jsonLoad[rows;$arraySortBy[rows;asc;$get[tie]]]]
      $arrayMap[$arraySortBy[rows;desc;$get[key]];row;
        $!jsonSet[row;pos;$math[$env[i] + 1]]
        $return[$env[row]]
      ;rows;i]
      $setCache[leaderboard;$get[type];$env[rows]]
    ]
  `,
});
//# sourceMappingURL=refreshLeaderboardCache.js.map