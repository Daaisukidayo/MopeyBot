"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleAddHistory',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[difficulties;$getGlobalVar[difficulties]]
    $jsonLoad[playTypes;$getGlobalVar[playTypes]]

    $timezone[$env[userProfile;timezone]]

    $if[$getUserVar[addHistorySavedConfig]==;
      $addHistoryNewConfig
    ]

    $jsonLoad[addHistorySavedConfig;$getUserVar[addHistorySavedConfig]]

    $historyEmbed[$getUserVar[addHistorySavedConfig]]
    $addHistoryExtraEmbed
    $newCommandTimeout
  `
};
//# sourceMappingURL=add.js.map