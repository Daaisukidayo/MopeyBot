export default {
  name: 'handleEnd',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $isActiveChallenge

    $defer

    $stopTimer
    $deleteTime

    $jsonLoad[challengeProgress;$getProgress]
    $jsonLoad[raresList;$env[challengeProgress;list]]
    $jsonLoad[result;$generateList[$sortList[$env[raresList]]]]

    $jsonLoad[list;$env[result;l]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.challenge.completed.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showRares]
      $addSeparator[Large]
      $showDesignedList[$env[list]]
    ;$getGlobalVar[luckyColor]]    
    $!send
    
    $if[$getChannelVar[lobby]==;
      $deleteProgress
    ;
      $!jsonSet[challengeProgress;started;false]
      $saveProgress[$env[challengeProgress]]
      $allPlayersFinished
    ]
  `
}