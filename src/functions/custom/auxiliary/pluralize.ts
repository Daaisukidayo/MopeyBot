import { ArgType, ForgeFunction } from "@tryforge/forgescript";

export default new ForgeFunction({
  name: "pluralize",
  description: "Returns the correct form of a word based on the provided number, key and language.",
  output: ArgType.String,
  params: [
    {
      name: "_number",
      description: "The number to determine the correct form for.",
      type: ArgType.Number,
    },
    {
      name: "_key",
      description: "The key for the word to pluralize.",
      type: ArgType.String,
    },
    {
      name: "_locale",
      description: "The locale to use for pluralization.",
      type: ArgType.String,
    },
  ],
  code: `
    $c[Load the plural endings map from global variables]
    $jsonLoad[endingsMap;$getGlobalVar[endingsMap]]
    $let[locale;$env[_locale]]
    $let[key;$env[_key]]

    $c[Verify if the requested pluralization key exists for the current locale]
    $if[$env[endingsMap;$get[locale];$get[key]]==;
      $return[❌ invalid key ($get[key])]
    ]
    
    $c[Calculate absolute values modulo 100 and modulo 10 to determine plural forms]
    $let[absN;$math[$abs[$env[_number]] % 100]]
    $let[n1;$math[$get[absN] % 10]]

    $c[Rule for numbers 11-19 (e.g., 5-19 items -> Form index 2)]
    $if[$and[$get[absN]>10;$get[absN]<20];
      $return[$env[endingsMap;$get[locale];$get[key];2]]
    ]
    $c[Rule for numbers ending in 2, 3, 4 except 12-14 (e.g., 2-4 items -> Form index 1)]
    $if[$and[$get[n1]>1;$get[n1]<5];
      $return[$env[endingsMap;$get[locale];$get[key];1]]
    ]
    $c[Rule for numbers ending in 1 except 11 (e.g., 1 item -> Form index 0)]
    $if[$get[n1]==1;
      $return[$env[endingsMap;$get[locale];$get[key];0]]
    ]

    $c[Fallback rule for all other numbers (Form index 2)]
    $return[$env[endingsMap;$get[locale];$get[key];2]]
  `
})