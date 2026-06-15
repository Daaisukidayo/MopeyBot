export default [{
  name: "leaderboard",
  type: "interactionCreate",
  allowed: ['button', 'modal'],
  code: `
    $arrayLoad[IID;-;$customID]
    $arrayLoad[passKeys;,;prevPage,nextPage,customPage,modal]
    $onlyIf[$arraySome[passKeys;key;$arrayIncludes[IID;$env[key]]]]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $let[page;$env[IID;2]]
    $let[rowsPerPage;$env[IID;3]]
    $let[msgID;$messageID]

    $jsonLoad[LBpages;$getMessageVar[LBpages;$get[msgID]]]
    $onlyIf[$env[LBpages]!=;
      $interactionFail
    ]

    $addCooldown[leaderboard;true]
    
    $let[maxPages;$arrayLength[LBpages]]


    $switch[$env[IID;1];
      $case[prevPage;
        $letSub[page;1]
      ]
      $case[nextPage;
        $letSum[page;1]
      ]
      $case[customPage;
        $modal[leaderboard-modal-$get[page]-$get[rowsPerPage]-$authorID;$tl[$get[l];ui;leaderboard.modalTitle]]
        $addTextInput[pageInput;$tl[$get[l];ui;leaderboard.modalDescriptionPage];Short;true]
        $showModal
        $stop
      ]
      $case[modal;
        $let[page;$input[pageInput]]
        $onlyIf[$isNumber[$get[page]];
          $newError[$tl[$get[l];ui;errors.notNumber]]
        ]
      ]
    ]

    $let[page;$if[$get[page]<=0;$get[maxPages];$if[$get[page]>$get[maxPages];1;$get[page]]]]

    $jsonLoad[cachedLB;$arrayAt[LBpages;$math[$get[page]-1]]]

    $leaderboardEmbed
    $interactionUpdate
    $newLeaderboardTimeout
  `
}]