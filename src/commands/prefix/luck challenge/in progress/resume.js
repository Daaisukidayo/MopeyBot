export default {
  name: "resume",
  aliases: ["continue", "res"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused];
      $newError[$tl[ui.resume.notPaused]]
    ]

    $!jsonSet[challengeProgress;paused;false]
    $saveProgress
    $startTimer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.resume.continued]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]
      $displayRaresLimit
    ;$getGlobalVar[luckyColor]]
  `
}