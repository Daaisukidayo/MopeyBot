import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleLeaderboard",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile

    $onlyIf[$hasCache[leaderboard;mc];
      $newError[$tl[ui.leaderboard.notReady.$get[l]]]
    ]

    $addCooldown
    $defer

    $c[coins table by default, else the key from leaderboardTypes]
    $let[type;$nullish[$option[table];mc]]

    $c[the cached array is shared, copy pages out, don't mutate. the msg keeps the whole list so its pages don't shift till it's deleted]
    $getCache[leaderboard;$get[type];LBlist]

    $c[defaults: 10 rows, page 1]
    $let[rows;$default[$option[rows];$message[1]]]
    $let[rowsPerPage;$if[$and[$isNumber[$get[rows]];$inRange[$get[rows];1;10]];$floor[$get[rows]];10]]
    $let[maxPages;$arrayPageCount[LBlist;$get[rowsPerPage]]]
    $let[page;$default[$option[page];$message[0]]]
    $let[page;$if[$and[$isNumber[$get[page]];$inRange[$get[page];1;$get[maxPages]]];$floor[$get[page]];1]]

    $jsonLoad[cachedLB;$arrayPage[LBlist;$get[page];$get[rowsPerPage]]]
    $leaderboardEmbed[cachedLB;$get[page];$get[maxPages];$get[rowsPerPage];$get[type]]
    $let[msgID;$send]

    $c[the table menu is always there, so always schedule the delete]
    $setMessageVar[LBlist;$env[LBlist];$get[msgID]]
    $newLeaderboardTimeout[$get[msgID]]
  `,
})
