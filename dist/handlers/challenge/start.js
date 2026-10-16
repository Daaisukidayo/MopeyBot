"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleStart",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
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
    $startChallengeTimer
  `,
});
//# sourceMappingURL=start.js.map