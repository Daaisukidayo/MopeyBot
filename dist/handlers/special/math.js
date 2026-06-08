"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleMath',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    $checkProfile

    $let[e;$default[$option[expression];$message]]
    $let[a;$math[$get[e]]]
    $onlyIf[$get[a]!=;
      $newError[$tl[$get[l];ui;errors.usage;$if[$guildID==;$getGlobalVar[prefix];$getGuildVar[prefix]]math <$tl[$get[l];ui;math.expression]>]]
    ]

    $addTextDisplay[## $get[e] = $get[a]]
  `
};
//# sourceMappingURL=math.js.map