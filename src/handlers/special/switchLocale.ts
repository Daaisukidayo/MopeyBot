import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
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
})
