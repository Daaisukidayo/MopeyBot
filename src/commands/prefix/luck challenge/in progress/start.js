export default {
  name: "start",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile

    $onlyIf[$getChannelVar[lobby]==;
      $newError[$tl[ui.start.activeLobby]]
    ]
    $onlyIf[$getProgress==;
      $newError[$tl[ui.start.alreadyActive]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.start.hasBegun]]
      $addTextDisplay[$tl[ui.start.turnOnNotification]]
    ;$getGlobalVar[luckyColor]]

    $setProgress
    $startTimer
  `
}