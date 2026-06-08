"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handlePause',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused]==false;
      $newError[$tl[$get[l];ui;pause.alreadyPaused]]
    ]

    $onlyIf[$getTimer<3600;
      $newError[$tl[$get[l];ui;pause.timesUp]]
    ]
    
    $!jsonSet[challengeProgress;paused;true]
    $saveProgress[$env[challengeProgress]]
    $stopTimer

    $addContainer[
      $addAuthorDisplay  
      $addTextDisplay[$tl[$get[l];ui;pause.paused]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]
      $displayLimitedRares
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=pause.js.map