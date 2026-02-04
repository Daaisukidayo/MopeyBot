export default {
  name: "time",
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $isActiveChallenge
    $addCooldown[1s]

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[ui.time.$if[$dump[$getProgress;paused];paused;inProgress]]]
      $addSeparator[Large]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
  `
}