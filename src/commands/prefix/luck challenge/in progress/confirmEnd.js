export default {
  type: "interactionCreate",
  allowedInteractionTypes: ["button"],
  description: "confirmation of ending challenge",
  code: `
    $arrayLoad[IID;-;$customID]
    $onlyIf[$arrayIncludes[IID;confirmEndingChallenge]]
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $onlyIf[$arrayIncludes[IID;$authorID];$onlyAuthorInteraction]

    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$and[$env[challengeProgress]!=;$env[challengeProgress;started]];
      $!deleteMessage[$channelID;$messageID]
      $newError[$tl[ui.challenge.active]]
    ]

    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[history;$getUserVar[challengeHistory]]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]
      
    $jsonLoad[list;$env[result;l]]

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[ui.challenge.completed]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showRares]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]
    $interactionUpdate

    $stopTimer
    $deleteTime

    $c[============== ADDING HISTORY ==============]

    $let[playType;$if[$env[challengeProgress;teamID]==-1;0;1]]

    $jsonLoad[newHistory;$getGlobalVar[baseHistoryPage]]

    $!jsonSet[newHistory;points;$env[challengeProgress;points]]
    $!jsonSet[newHistory;rares;$env[challengeProgress;rares]]
    $!jsonSet[newHistory;endDate;$getTimestamp]
    $!jsonSet[newHistory;playType;$get[playType]]
    $!jsonSet[newHistory;difficulty;$env[challengeProgress;difficulty]]
    $!jsonSet[newHistory;raresList;$env[challengeProgress;list]]

    $arrayPushJSON[history;$env[newHistory]]
    $setUserVar[challengeHistory;$env[history]]

    $if[$env[challengeProgress;teamID]==-1;
      $deleteProgress
    ;
      $!jsonSet[challengeProgress;started;false]
      $saveProgress
      $allPlayersFinished
    ]
  `,
};
