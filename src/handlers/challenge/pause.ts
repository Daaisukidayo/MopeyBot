import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handlePause",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]

    $onlyIf[$jsonGet[challengeProgress;paused]==false;
      $newError[$tl[ui.pause.alreadyPaused.$get[l]]]
    ]

    $onlyIf[$getChallengeTimer<3600;
      $newError[$tl[ui.pause.timesUp.$get[l]]]
    ]
    
    $!jsonSet[challengeProgress;paused;true]
    $saveProgress[$env[challengeProgress]]
    $pauseChallengeTimer

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[ui.pause.paused.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints[challengeProgress]]
      $addTextDisplay[$showTime]
      $displayLimitedRares[challengeProgress]
    ;$getGlobalVar[luckyColor]]
  `
})
