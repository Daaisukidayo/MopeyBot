"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleTime",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $jsonLoad[challengeProgress;$getProgress]
    $isActiveChallenge[challengeProgress]
    $addCooldown

    $let[newTime;$toLowerCase[$advancedReplace[$default[$option[new-time];$message]; ;;\n;]]]
    $let[paused;$jsonGet[challengeProgress;paused]]

    $if[$get[newTime]!=;

      $c[Seconds, or minutes and seconds like 30:00, or a duration like 30m 5s]
      $if[$includes[$get[newTime];:];
        $let[newTime;$math[$unparseDigital[$get[newTime]] / 1000]]
      ;$if[$and[$isNumber[$get[newTime]]==false;$includes[$get[newTime];m;s]];
        $let[newTime;$math[$parseString[$get[newTime]] / 1000]]
      ]]

      $c[Typed or parsed, the time must be 0 to 3600 seconds]
      $onlyIf[$and[$isNumber[$get[newTime]];$inRange[$get[newTime];0;3600]];
        $newError[$tl[ui.time.invalidTime.$get[l]]]
      ]

      $setChallengeTimer[$get[newTime]]

      $c[3600 ends the hour right away, so the challenge is no longer paused]
      $if[$get[newTime]>=3600;
        $!jsonSet[challengeProgress;paused;false]
        $let[paused;false]
        $let[hourOver;true]
      ]

      $let[passedSeconds;$getChallengeTimer]
      $!jsonSet[challengeProgress;events;$arrayFilter[$jsonGet[challengeProgress;events];event;$get[passedSeconds]>$jsonGet[event;0]]]
      $saveProgress[$env[challengeProgress]]
    ]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.time.$if[$get[paused];paused;inProgress].$get[l]]]

      $addSeparator[Large]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]

    $c[No timer is set for a reached milestone, so the end of the hour is told here, in its own message after the reply]
    $if[$get[hourOver]==true;
      $!send
      $sendMessage[$channelID;$addHourOverContainer[$authorID;$get[l]]]
    ]
  `
});
//# sourceMappingURL=time.js.map