export default {
  name: 'handlePause',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused]==false;
      $newError[$tl[ui.pause.alreadyPaused.$get[l]]]
    ]

    $onlyIf[$getTimer<3600;
      $newError[$tl[ui.pause.timesUp.$get[l]]]
    ]
    
    $!jsonSet[challengeProgress;paused;true]
    $saveProgress[$env[challengeProgress]]
    $stopTimer

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[ui.pause.paused.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]
      $displayLimitedRares
    ;$getGlobalVar[luckyColor]]
  `
}