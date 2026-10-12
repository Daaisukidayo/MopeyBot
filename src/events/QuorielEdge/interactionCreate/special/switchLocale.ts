import { Command } from "@quoriel/edge"

export default new Command({
  name: "switchlocale",
  type: "interactionCreate",
  allowed: ["autocomplete"],
  code: `
    $let[focusedValue;$toLowerCase[$focusedOptionValue]]

    $jsonLoad[locales;$jsonEntries[$getGlobalVar[allLocales]]]

    $if[$get[focusedValue]!=;
      $arrayFilter[locales;locale;$or[$includes[$toLowerCase[$jsonGet[locale;0]];$get[focusedValue]];$includes[$toLowerCase[$jsonGet[locale;1]];$get[focusedValue]]];locales]
    ]

    $arrayForEach[$arraySlice[locales;;0;25];locale;
      $addChoice[$jsonGet[locale;1];$jsonGet[locale;0]]
    ]

    true
  `
})
