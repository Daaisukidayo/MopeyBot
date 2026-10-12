import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleResume",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]

    $onlyIf[$jsonGet[challengeProgress;paused];
      $newError[$tl[ui.resume.notPaused.$get[l]]]
    ]

    $!jsonSet[challengeProgress;paused;false]
    $saveProgress[$env[challengeProgress]]
    $resumeChallengeTimer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.resume.continued.$get[l]]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints[challengeProgress]]
      $addTextDisplay[$showTime]
      $displayLimitedRares[challengeProgress]
    ;$getGlobalVar[luckyColor]]
  `
})
