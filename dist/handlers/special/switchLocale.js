"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    name: 'handleSwitchlocale',
    code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[arg;$toLowerCase[$default[$option[locale];$message]]]

    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $arrayMap[locales;locale;
      $return[$toLowercase[$env[locale;name]]]
    ;localeNames]

    $onlyIf[$arrayIncludes[localeNames;$get[arg]];
      $newError[$tl[$get[l];ui;switchlocale.unknown]]
    ]

    $defer
    
    $let[i;$arrayIndexOf[localeNames;$get[arg]]]
    $!jsonSet[userProfile;language;$get[i]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[i];ui;switchlocale.switched;$env[locales;$get[i];description]]]
    ;$getGlobalVar[defaultColor]]
  `
};
//# sourceMappingURL=switchLocale.js.map