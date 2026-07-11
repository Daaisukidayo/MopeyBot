export default {
  name: "confirmEndingChallenge",
  description: "When pressing 'Confirm' button",
  type: "interactionCreate",
  allowed: ["button"],
  code: `
    $arrayLoad[IID;-;$customID]

    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]

    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$and[$env[challengeProgress]!=;$env[challengeProgress;started]];
      $!deleteMessage[$channelID;$messageID]
      $newError[$tl[ui.challenge.active.$get[l]]]
    ]

    $!jsonSet[challengeProgress;endDate;"$getTimestamp"]
    $!jsonSet[challengeProgress;playType;$if[$env[challengeProgress;teamID]==-1;0;1]]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]
      
    $jsonLoad[list;$env[result;l]]

    $addChallengeCompletedContainer[{
      "locale": "$get[l]",
      "points": $env[challengeProgress;points],
      "rares": $env[challengeProgress;rares],
      "list": $env[list]
    }]
    $interactionUpdate

    $stopTimer
    $deleteTime


    $pushNewHistoryPage[$env[challengeProgress]]

    $if[$env[challengeProgress;teamID]==-1;
      $deleteChallengeProgress
    ;
      $!jsonSet[challengeProgress;started;false]
      $saveProgress[$env[challengeProgress]]
      $allPlayersFinished
    ]
  `
}
