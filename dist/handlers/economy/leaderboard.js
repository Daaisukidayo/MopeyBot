"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleLeaderboard",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $onlyIf[$hasCache[leaderboard;cachedLB];
      $newError[$tl[ui.leaderboard.notReady.$get[l]]]
    ]

    $addCooldown
    $defer

    $c[The cached array is shared, so a page is copied out of it without changing it. The message keeps the whole list, so its pages stay the same until it is deleted]
    $getCache[leaderboard;cachedLB;LBlist]

    $c[10 rows and the first page, unless others are given]
    $let[rows;$default[$option[rows];$message[1]]]
    $let[rowsPerPage;$if[$and[$isNumber[$get[rows]];$inRange[$get[rows];1;10]];$floor[$get[rows]];10]]
    $let[maxPages;$arrayPageCount[LBlist;$get[rowsPerPage]]]
    $let[page;$default[$option[page];$message[0]]]
    $let[page;$if[$and[$isNumber[$get[page]];$inRange[$get[page];1;$get[maxPages]]];$floor[$get[page]];1]]

    $jsonLoad[cachedLB;$arrayPage[LBlist;$get[page];$get[rowsPerPage]]]
    $leaderboardEmbed[cachedLB;$get[page];$get[maxPages];$get[rowsPerPage]]
    $let[msgID;$send]

    $if[$get[maxPages]>1;
      $setMessageVar[LBlist;$env[LBlist];$get[msgID]]
      $newLeaderboardTimeout[$get[msgID]]
    ]
  `
});
//# sourceMappingURL=leaderboard.js.map