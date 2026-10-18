import { ForgeClassBuilder, ParamType } from "forge.class"

export default new ForgeClassBuilder({
  name: "ChallengeHistory",
  fields: {
    userID: null,
    pages: [],
  },
  methods: {
    constructor: {
      params: [{ name: "userId", type: ParamType.String }],
      code: `
        $setField[this;userID;$env[userId]]
        $setField[this;pages;$getUserVar[challengeHistory;$env[userId]]]
      `,
    },

    save: `
      $setUserVar[challengeHistory;$getField[this;pages];$getField[this;userID]]
    `,

    add: {
      params: [{ name: "pageData", type: ParamType.Json }],
      code: `
        $c[A new page gets an ID and only the fields a history page has]
        $jsonLoad[page;$getGlobalVar[baseHistoryPage]]
        $!jsonSet[page;id;$randomUUID]
        $objectMerge[page;$objectPick[pageData;points;rares;endDate;playType;difficulty;raresList]]
        $arrayPushAt[this;pages;$env[page]]
      `,
    },

    remove: {
      params: [{ name: "id", type: ParamType.String }],
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
      params: [{ name: "page", type: ParamType.Json }],
      code: `
        $let[index;$arrayFindIndex[$getField[this;pages];old;$jsonGet[old;id]==$jsonGet[page;id]]]
        $if[$get[index]!=-1;
          $!jsonSet[this;pages;$get[index];$env[page]]
        ]
        $return[$checkCondition[$get[index]!=-1]]
      `,
    },
  },
})
