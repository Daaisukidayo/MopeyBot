"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = [{
        name: 'handleRaretrymode',
        code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer

    $jsonLoad[modes;$getGlobalVar[raretryModes]]

    $raretrymodeEmbed
    $newCommandTimeout
  `
    }, {
        name: 'raretrymodeEmbed',
        code: `
    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[l];ui;raretrymode.title]]

      $loop[$arrayLength[modes];
        $let[i;$math[$env[i] - 1]]
        $let[modeI;$arrayAt[modes;$get[i]]]
        $let[mode;$tl[$get[l];data;raretryModes.$get[modeI]]]
        $if[$math[$get[i] % 3]==0;
          $addActionRow
        ]

        $addButton[$get[modeI]-rtMode-$authorID;$get[mode];Success;;$checkCondition[$env[userProfile;rtMode]==$get[modeI]]]
      ;i;true]
    ;$getGlobalVar[luckyColor]]
  `
    }];
//# sourceMappingURL=raretryMode.js.map