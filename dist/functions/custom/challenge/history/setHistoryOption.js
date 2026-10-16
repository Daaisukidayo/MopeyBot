"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "setHistoryOption",
    description: "Returns the history page with an option changed to a typed or chosen value. Stops the command with an error if the value is wrong.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "page",
            description: "The history page being made or edited.",
            type: forgescript_1.ArgType.Json,
        },
        {
            name: "option",
            description: "The option: points, raresQuantity, playType, difficulty, endDate or raresList.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "value",
            description: "The value from the form or the menu.",
            type: forgescript_1.ArgType.String,
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
        $c[The field holds the whole list, so it is rebuilt from it: a removed line removes that rare. Points and rares follow]
        $!jsonSet[page;raresList;$objectOf]
        $objectMerge[page;$parseRaresList[$get[value]]]
      ]
    ]

    $return[$env[page]]
  `,
});
//# sourceMappingURL=setHistoryOption.js.map