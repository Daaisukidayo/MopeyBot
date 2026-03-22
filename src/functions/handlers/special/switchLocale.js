export default {
  name: 'handleSwitchlocale',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $let[arg;$toUpperCase[$default[$option[locale];$message]]]

    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $arrayMap[locales;locale;
      $return[$env[locale;name]]
    ;localeNames]

    $onlyIf[$arrayIncludes[localeNames;$get[arg]];
      $newError[$tl[ui.switchlocale.unknown]]
    ]

    $defer
    
    $let[i;$arrayIndexOf[localeNames;$get[arg]]]
    $!jsonSet[userProfile;language;$get[i]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.switchlocale.switched;$env[locales;$get[i];description]]]
    ;$getGlobalVar[defaultColor]]
  `
}