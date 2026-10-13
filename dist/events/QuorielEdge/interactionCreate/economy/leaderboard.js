"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "leaderboard",
    type: "interactionCreate",
    allowed: ["button", "modal"],
    code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$isOneOf[$jsonGet[IID;1];prevPage;nextPage;customPage;modal]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[page;$jsonGet[IID;2]]
    $let[rowsPerPage;$jsonGet[IID;3]]

    $jsonLoad[LBlist;$getMessageVar[LBlist;$messageID]]
    $onlyIf[$env[LBlist]!=;
      $interactionFail
    ]

    $addCooldown[leaderboard;true]

    $let[maxPages;$arrayPageCount[LBlist;$get[rowsPerPage]]]


    $switch[$jsonGet[IID;1];
      $case[prevPage;
        $letSub[page;1]
      ]
      $case[nextPage;
        $letSum[page;1]
      ]
      $case[customPage;
        $modal[leaderboard-modal-$get[page]-$get[rowsPerPage]-$authorID;$tl[ui.leaderboard.modalTitle.$get[l]]]
        $addTextInput[pageInput;$tl[ui.leaderboard.modalDescriptionPage.$get[l]];Short;true]
        $showModal
        $stop
      ]
      $case[modal;
        $let[page;$input[pageInput]]
        $onlyIf[$isNumber[$get[page]];
          $newError[$tl[ui.errors.notNumber.$get[l]]]
        ]
        $c[A page can only be a whole number]
        $let[page;$floor[$get[page]]]
      ]
    ]

    $let[page;$if[$get[page]<=0;$get[maxPages];$if[$get[page]>$get[maxPages];1;$get[page]]]]

    $jsonLoad[cachedLB;$arrayPage[LBlist;$get[page];$get[rowsPerPage]]]

    $leaderboardEmbed[cachedLB;$get[page];$get[maxPages];$get[rowsPerPage]]
    $interactionUpdate
    $newLeaderboardTimeout
  `
});
//# sourceMappingURL=leaderboard.js.map