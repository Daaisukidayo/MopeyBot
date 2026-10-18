"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge_class_1 = require("forge.class");
exports.default = new forge_class_1.ForgeClassBuilder({
    name: "ChallengeHistory",
    fields: {
        userID: null,
        pages: [],
    },
    methods: {
        constructor: {
            params: [{ name: "userId", type: forge_class_1.ParamType.String }],
            code: `
        $setField[this;userID;$env[userId]]
        $setField[this;pages;$getUserVar[challengeHistory;$env[userId]]]
      `,
        },
        save: `
      $setUserVar[challengeHistory;$getField[this;pages];$getField[this;userID]]
    `,
        add: {
            params: [{ name: "pageData", type: forge_class_1.ParamType.Json }],
            code: `
        $c[A new page gets an ID and only the fields a history page has]
        $jsonLoad[page;$getGlobalVar[baseHistoryPage]]
        $!jsonSet[page;id;$randomUUID]
        $objectMerge[page;$objectPick[pageData;points;rares;endDate;playType;difficulty;raresList]]
        $arrayPushAt[this;pages;$env[page]]
      `,
        },
        remove: {
            params: [{ name: "id", type: forge_class_1.ParamType.String }],
            code: `
        $let[index;$arrayFindIndex[$getField[this;pages];page;$jsonGet[page;id]==$env[id]]]
        $let[found;$and[$env[id]!=;$get[index]!=-1]]
        $if[$get[found];
          $jsonLoad[pages;$getField[this;pages]]
          $!arraySplice[pages;$get[index];1]
          $setField[this;pages;$env[pages]]
        ]
        $return[$get[found]]
      `,
        },
        replace: {
            params: [{ name: "page", type: forge_class_1.ParamType.Json }],
            code: `
        $let[index;$arrayFindIndex[$getField[this;pages];old;$jsonGet[old;id]==$jsonGet[page;id]]]
        $if[$get[index]!=-1;
          $!jsonSet[this;pages;$get[index];$env[page]]
        ]
        $return[$checkCondition[$get[index]!=-1]]
      `,
        },
    },
});
//# sourceMappingURL=ChallengeHistory.js.map