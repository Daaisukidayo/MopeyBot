"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleStart',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile

    $onlyIf[$getChannelVar[lobby]==;
      $newError[$tl[$get[l];ui;start.activeLobby]]
    ]
    $onlyIf[$getProgress==;
      $newError[$tl[$get[l];ui;start.alreadyActive]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;start.hasBegun]]
      $addTextDisplay[$tl[$get[l];ui;start.turnOnNotification]]
    ;$getGlobalVar[luckyColor]]
    $!send

    $setProgress
    $startTimer
  `
};
//# sourceMappingURL=start.js.map