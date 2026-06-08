"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleResume',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $isActiveChallenge
    $jsonLoad[challengeProgress;$getProgress]

    $onlyIf[$env[challengeProgress;paused];
      $newError[$tl[$get[l];ui;resume.notPaused]]
    ]

    $!jsonSet[challengeProgress;paused;false]
    $saveProgress[$env[challengeProgress]]
    $startTimer

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;resume.continued]]
      $addSeparator[Large]
      $addTextDisplay[$showPoints]
      $addTextDisplay[$showTime]
      $displayLimitedRares
    ;$getGlobalVar[luckyColor]]
  `
};
//# sourceMappingURL=continue.js.map