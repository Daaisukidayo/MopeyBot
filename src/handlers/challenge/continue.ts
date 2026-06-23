export default {
  name: 'handleResume',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused];
      $newError[$tl[ui.resume.notPaused.$get[l]]]
    ]

    $!jsonSet[challengeProgress;paused;false]
    $saveProgress[$env[challengeProgress]]
    $startTimer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.resume.continued.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]
      $displayLimitedRares
    ;$getGlobalVar[luckyColor]]
  `
}