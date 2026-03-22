export default [{
  name: "switchlocale",
  aliases: ["switchlanguage", "setnewlang", "setnewlocale", "sl"],
  type: "messageCreate",
  code: `
    $handleSwitchlocale
  `
},{
  type: "interactionCreate",
  allowedInteractionTypes: ['autocomplete'],
  code: `
    $onlyIf[$applicationCommandName==switchlocale]
    $let[focusedValue;$toUpperCase[$focusedOptionValue]]

    $jsonLoad[locales;$getGlobalVar[allLocales]]

    $if[$get[focusedValue]!=;
      $arrayFilter[locales;locale;
        $return[$includes[$env[locale;description];$get[focusedValue]]]
      ;locales]
    ]

    $loop[25;
      $let[i;$math[$env[i] - 1]]
      $let[name;$env[locales;$get[i];name]]
      $let[desc;$env[locales;$get[i];description]]

      $if[$or[$get[name]==;$get[desc]==];
        $interactionFail
        $break
      ]

      $addChoice[$get[desc];$get[name]]
    ;i;true]
    $autocomplete
  `
}]
