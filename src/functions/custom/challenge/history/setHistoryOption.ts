import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "setHistoryOption",
  description:
    "returns the history page w/ one option set to a typed or picked value. bad value = the command stops w/ an error",
  output: ArgType.Json,
  params: [
    {
      name: "page",
      description: "the history page being made or edited",
      type: ArgType.Json,
    },
    {
      name: "option",
      description: "points, raresQuantity, playType, difficulty, endDate or raresList",
      type: ArgType.String,
    },
    {
      name: "value",
      description: "the value from the form or the menu",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[value;$trim[$env[value]]]

    $switch[$env[option];
      $case[points;
        $onlyIf[$and[$isNumber[$get[value]];$get[value]>0];
          $newError[$tl[ui.history.listOptionInvalidPoints.$get[l]]]
        ]
        $!jsonSet[page;points;$round[$get[value]]]
      ]

      $case[raresQuantity;
        $onlyIf[$and[$isNumber[$get[value]];$get[value]>0];
          $newError[$tl[ui.history.listOptionInvalidRares.$get[l]]]
        ]
        $!jsonSet[page;rares;$round[$get[value]]]
      ]

      $case[playType;
        $!jsonSet[page;playType;$get[value]]
      ]

      $case[difficulty;
        $!jsonSet[page;difficulty;$get[value]]
      ]

      $case[endDate;
        $let[date;$unparseDate[$get[value]]]
        $onlyIf[$and[$get[date]>0;$get[date]<$getTimestamp];
          $newError[$tl[ui.history.listOptionInvalidDate.$get[l]]]
        ]
        $!jsonSet[page;endDate;$get[date]]
      ]

      $case[raresList;
        $c[the field is the whole list, rebuild from it (deleted line = rare gone). points and rares follow]
        $!jsonSet[page;raresList;$objectOf]
        $objectMerge[page;$parseRaresList[$get[value]]]
      ]
    ]

    $return[$env[page]]
  `,
})
