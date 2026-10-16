"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "handleSwitchlocale",
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[locale;$default[$option[locale];$message]]

    $jsonLoad[locales;$getGlobalVar[allLocales]]

    $onlyIf[$jsonHas[locales;$get[locale]];
      $newError[$tl[ui.switchlocale.unknown.$get[l]]]
    ]

    $defer
    
    $!jsonSet[userProfile;language;$get[locale]]
    $saveProfile[$env[userProfile]]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.switchlocale.switched.$get[locale];$jsonGet[locales;$get[locale]]]]
    ;$getGlobalVar[defaultColor]]
  `,
});
//# sourceMappingURL=switchLocale.js.map