export default {
  name: "pause",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused]==false;
      $newError[$tl[ui.pause.alreadyPaused]]
    ]
    $onlyIf[$getUserVar[1htime|$channelID]<3600;
      $newError[$tl[ui.pause.timesUp]]
    ]
    
    $!jsonSet[challengeProgress;paused;true]
    $saveProgress
    $stopTimer

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[ui.$commandName.paused]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]

      $displayRaresLimit
    ;$getGlobalVar[luckyColor]]
  `
}