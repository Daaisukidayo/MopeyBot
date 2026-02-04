export default {
  name: "switchlocale",
  aliases: ["switchlanguage", "setnewlang", "setnewlocale", "sl"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[5s]

    $jsonLoad[locales;$getGlobalVar[allLocales]]
    $arrayMap[locales;locale;
      $return[$env[locale;name]]
    ;localeNames]

    $let[arg;$toUpperCase[$message]]

    $onlyIf[$arrayIncludes[localeNames;$get[arg]];
      $newError[$tl[ui.switchlocale.unknown]]
    ]
    
    $let[i;$arrayIndexOf[localeNames;$get[arg]]]
    $!jsonSet[userProfile;language;$get[i]]
    $saveProfile

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$tl[ui.switchlocale.switched;$env[locales;$get[i];description]]]
    ;$getGlobalVar[defaultColor]]
  `
}
