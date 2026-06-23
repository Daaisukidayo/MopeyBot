export default {
  name: 'handleStart',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$getChannelVar[lobby]==;
      $newError[$tl[ui.start.activeLobby.$get[l]]]
    ]
    $onlyIf[$getProgress==;
      $newError[$tl[ui.start.alreadyActive.$get[l]]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.start.hasBegun.$get[l]]]
      $addTextDisplay[$tl[ui.start.turnOnNotification.$get[l]]]
    ;$getGlobalVar[luckyColor]]
    $!send

    $setProgress
    $startTimer
  `
}