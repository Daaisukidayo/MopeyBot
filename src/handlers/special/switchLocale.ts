export default {
  name: 'handleSwitchlocale',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $let[locale;$default[$option[locale];$message]]

    $jsonLoad[locales;$getGlobalVar[allLocales]]

    $onlyIf[$jsonHas[locales;$get[locale]];
      $newError[$tl[$get[l];ui;switchlocale.unknown]]
    ]

    $defer
    
    $!jsonSet[userProfile;language;$get[locale]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[$get[locale];ui;switchlocale.switched;$env[locales;$get[locale]]]]
    ;$getGlobalVar[defaultColor]]
  `
}