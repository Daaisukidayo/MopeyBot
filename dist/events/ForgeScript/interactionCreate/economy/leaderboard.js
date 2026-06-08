"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        type: 'interactionCreate',
        allowedInteractionTypes: ['button', 'modal'],
        code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;leftLB,rightLB,customPageLB,customPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[page;$env[IID;0]]
    $let[rowsPerPage;$env[IID;1]]
    $let[msgID;$messageID]

    $jsonLoad[LBpages;$getMessageVar[LBpages;$get[msgID]]]
    $onlyIf[$env[LBpages]!=;
      $interactionFail
    ]

    $addCooldown[leaderboard;true]
    
    $let[maxPages;$arrayLength[LBpages]]


    $switch[$env[IID;2];
      $case[leftLB;
        $letSub[page;1]
      ]
      $case[rightLB;
        $letSum[page;1]
      ]
      $case[customPageLB; $c[custom page modal]
        $modal[$get[page]-$get[rowsPerPage]-customPageModal-$authorID;$tl[$get[l];ui;leaderboard.modalTitle]]
        $addTextInput[pageInput;$tl[$get[l];ui;leaderboard.modalDescriptionPage];Short;true]
        $showModal
        $stop
      ]
      $case[customPageModal; $c[custom page input]
        $let[page;$input[pageInput]]
      ]
    ]

    $let[page;$if[$get[page]<=0;$get[maxPages];$if[$get[page]>$get[maxPages];1;$get[page]]]]

    $jsonLoad[cachedLB;$arrayAt[LBpages;$math[$get[page]-1]]]

    $leaderboardEmbed
    $interactionUpdate
    $newLeaderboardTimeout
  `
    }];
//# sourceMappingURL=leaderboard.js.map