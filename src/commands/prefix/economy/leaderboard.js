export default [{
  name: "leaderboard",
  aliases: ["lb", "top"],
  type: "messageCreate",
  code: `
    $handleLeaderboard
  `
},{
  type: 'interactionCreate',
  allowedInteractionTypes: ['button', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;leftLB,rightLB,customPageLB,customPageModal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[page;$env[IID;0]]
    $let[rowsPerPage;$env[IID;1]]
    $let[msgID;$messageID]

    $jsonLoad[LBpages;$getMessageVar[LBpages;$get[msgID]]]
    $onlyIf[$env[LBpages]!=;$interactionFail]

    $addCooldown[leaderboard;true]
    
    $let[maxPages;$arrayLength[LBpages]]


    $switch[$env[IID;2];
      $case[leftLB;
        $letSub[page;1]
        $if[$get[page]<=0;
          $let[page;$get[maxPages]]
        ]
      ]
      $case[rightLB;
        $letSum[page;1]
        $if[$get[page]>$get[maxPages];
          $let[page;1]
        ]
      ]
      $case[customPageLB; $c[custom page modal]
        $modal[$get[page]-$get[rowsPerPage]-customPageModal-$authorID;$tl[ui.leaderboard.modalTitle]]
        $addTextInput[modalInput1;$tl[ui.leaderboard.modalDescription];Short;true;$tl[ui.leaderboard.modalPlaceholderPageCondition;$get[maxPages]]]
        $showModal
        $stop
      ]
      $case[customPageModal; $c[custom page input]
        $let[page;$input[modalInput1]]
        $onlyIf[$and[$isNumber[$get[page]];$get[page]>0;$get[page]<=$get[maxPages]];
          $newError[$tl[ui.leaderboard.invalidPage]]
        ]
      ]
    ]

    $jsonLoad[LB;$arrayAt[LBpages;$math[$get[page]-1]]]

    $leaderboardEmbed
    $interactionUpdate
    $newLeaderboardTimeout
  `
}]