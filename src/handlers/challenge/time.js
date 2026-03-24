export default {
  name: 'handleTime',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $isActiveChallenge
    $addCooldown

    $let[newTime;$toLowerCase[$advancedReplace[$default[$option[new_time];$message]; ;;\n;]]]
    $jsonLoad[challengeProgress;$getProgress]
    $let[paused;$env[challengeProgress;paused]]

    $if[$get[newTime]!=;

      $if[$isNumber[$get[newTime]]==false;
        $let[newTime;$function[
          $if[$includes[$get[newTime];:];
            $return[$math[$unparseDigital[$get[newTime]] / 1000]]
          ]
          $if[$includes[$get[newTime];m;s];
            $return[$math[$parseString[$get[newTime]] / 1000]]
          ]
          $return[$get[newTime]]
        ]]

        $onlyIf[$and[$isNumber[$get[newTime]];$inRange[$get[newTime];1;3599]];
          $newError[$tl[ui.time.invalidTime]]
        ]
      ]

      $setUserVar[1htime|$channelID;$get[newTime]]

      $if[$get[paused];;
        $stopTimer
        $startTimer
      ]

      $jsonLoad[events;$env[challengeProgress;events]]

      $arrayFilter[events;event;
        $return[$checkCondition[$getUserVar[1htime|$channelID]>$env[event;0]]]
      ;events]

      $!jsonSet[challengeProgress;events;$env[events]]
      $saveProgress
    ]

    $addContainer[
      $addAuthorDisplay

      $if[$get[paused];
        $addTextDisplay[$tl[ui.time.paused]]
      ;
        $addTextDisplay[$tl[ui.time.inProgress]]
      ]

      $addSeparator[Large]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]
  `
}