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

      $c[seconds, mm:ss like 30:00, or a duration like 30m 5s]
      $if[$includes[$get[newTime];:];
        $let[newTime;$math[$unparseDigital[$get[newTime]] / 1000]]
      ;$if[$and[$isNumber[$get[newTime]]==false;$includes[$get[newTime];m;s]];
        $let[newTime;$math[$parseString[$get[newTime]] / 1000]]
      ]]

      $c[either way it has to be 0-3600s]
      $onlyIf[$and[$isNumber[$get[newTime]];$inRange[$get[newTime];0;3600]];
        $newError[$tl[ui.time.invalidTime.$get[l]]]
      ]

      $setChallengeTimer[$get[newTime]]

      $c[3600 ends the hour now, so it's not paused anymore]
      $if[$get[newTime]>=3600;
        $setField[challengeProgress;paused;false]
        $let[paused;false]
        $let[hourOver;true]
      ]

      $callMethod[challengeProgress;trimEvents;$getChallengeTimer]
      $saveProgress[$env[challengeProgress]]
    ]

    $addContainer[
      $addAuthorDisplay

      $addTextDisplay[$tl[ui.time.$if[$get[paused];paused;inProgress].$get[l]]]

      $addSeparator[Large]
      $addTextDisplay[$showTime]
    ;$getGlobalVar[luckyColor]]

    $c[reached milestones get no timer, so announce the end here, as its own msg after the reply]
    $if[$get[hourOver]==true;
      $!send
      $sendMessage[$channelID;$addHourOverContainer[$authorID;$get[l]]]
    ]
  `,
});
//# sourceMappingURL=time.js.map