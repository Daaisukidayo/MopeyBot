export default {
  name: "edittime",
  aliases: ["etime", "et"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[10s]
    $isActiveChallenge
   

    $onlyIf[$or[$and[$isNumber[$message];$message>=0;$message<3600];$checkContains[$message;:]];
      $newError[$tl[ui.$commandName.invalidTime]]]
    
    $let[newTime;$if[$checkContains[$message;:];$round[$math[$unparseDigital[00:$message] / 1000]];$message]]

    $if[$getUserVar[1htime|$channelID]==3600;
      $startTimer
    ]
    $setUserVar[1htime|$channelID;$get[newTime]]

    $jsonLoad[challengeProgress;$getProgress]
    $jsonLoad[events;$env[challengeProgress;events]]

    $arrayMap[events;event;
      $if[$getUserVar[1htime|$channelID]>$env[event;0];
        $return[$env[event]]
      ]
    ;events]

    $!jsonSet[challengeProgress;events;$env[events]]
    $saveProgress

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
  `
}