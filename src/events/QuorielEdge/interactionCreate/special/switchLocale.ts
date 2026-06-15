export default {
  name: "switchlocale",
  type: "interactionCreate",
  allowed: ['autocomplete'],
  code: `
    $let[focusedValue;$toLowerCase[$focusedOptionValue]]

    $jsonLoad[locales;$jsonEntries[$getGlobalVar[allLocales]]]

    $if[$get[focusedValue]!=;
      $arrayFilter[locales;locale;
        $return[$or[$includes[$toLowercase[$env[locale;0]];$get[focusedValue]];$includes[$toLowercase[$env[locale;1]];$get[focusedValue]]]]
      ;locales]
    ]

    $loop[25;
      $let[i;$math[$env[i] - 1]]
      $let[name;$env[locales;$get[i];0]]
      $let[desc;$env[locales;$get[i];1]]

      $if[$or[$get[name]==;$get[desc]==];
        $break
      ]

      $addChoice[$get[desc];$get[name]]
    ;i;true]

    true
  `
}