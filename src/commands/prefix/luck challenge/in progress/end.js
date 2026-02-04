export default {
  name: "end",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $isActiveChallenge

    $stopTimer
    $deleteTime

    $jsonLoad[challengeProgress;$getProgress]
    $jsonLoad[raresList;$env[challengeProgress;list]]
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
    $sendMessage[$channelID]
    
    
    $if[$getChannelVar[lobby]==;
      $deleteProgress
    ;
      $!jsonSet[challengeProgress;started;false]
      $saveProgress
      $allPlayersFinished
    ]
  `
}
