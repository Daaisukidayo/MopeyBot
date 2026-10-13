"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const edge_1 = require("@quoriel/edge");
exports.default = new edge_1.Command({
    name: "help",
    type: "interactionCreate",
    allowed: ["autocomplete"],
    code: `
    $let[focusedValue;$toLowerCase[$focusedOptionValue]]

    $jsonLoad[commandsData;$arraySortBy[$jsonEntries[$readFile[res/data/commandsData.json]];asc;1;name]]

    $if[$get[focusedValue]!=;
      $arrayFilter[commandsData;command;$includes[$jsonGet[command;1;name];$get[focusedValue]];commandsData]
    ]

    $arrayForEach[$arraySlice[commandsData;;0;25];command;
      $addChoice[$jsonGet[command;1;name];$jsonGet[command;1;name]]
    ]

    true
  `
});
//# sourceMappingURL=help.js.map