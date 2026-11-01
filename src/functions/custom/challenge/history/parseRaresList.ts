import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "parseRaresList",
  description:
    "parses a history page's rares list, one '<abbreviation> = <count>' per line. returns 'raresList', 'points' and 'rares'",
  output: ArgType.Json,
  params: [
    {
      name: "text",
      description: "the list as the user typed it",
      type: ArgType.String,
      required: true,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $jsonLoad[raresList;$objectOf]
    $arrayLoad[lines;\n;$trim[$trimLines[$env[text]]]]

    $c[clamp to 100, 0 = skip the rare]
    $arrayForEach[lines;line;
      $arrayLoad[keyValue;=;$trim[$env[line]]]
      $let[animalId;$getRareAnimalID[$trim[$jsonGet[keyValue;0]]]]
      $let[value;$trim[$jsonGet[keyValue;1]]]

      $onlyIf[$get[animalId]!=undefined;
        $newError[$tl[ui.history.listOptionUnknownListRare.$get[l];$jsonGet[keyValue;0];$env[line]]]
      ]

      $onlyIf[$isNumber[$get[value]];
        $newError[$tl[ui.history.listOptionInvalidValue.$get[l];$get[value];$env[line]]]
      ]

      $if[$get[value]>0;
        $!jsonSet[raresList;$get[animalId];$min[$get[value];100]]
      ;
        $!jsonDelete[raresList;$get[animalId]]
      ]
    ]

    $jsonLoad[result;$sumRaresList[$env[raresList]]]
    $!jsonSet[result;raresList;$env[raresList]]
    $return[$env[result]]
  `,
})
