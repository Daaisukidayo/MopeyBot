"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forge_class_1 = require("forge.class");
exports.default = new forge_class_1.ForgeClassBuilder({
    name: "HistoryView",
    fields: {
        page: 1,
        sortType: "history_sort_endingdate",
        sortOrder: "desc",
        rareAnimalId: null,
        filter: false,
        history: [],
    },
    methods: {
        constructor: {
            params: [{ name: "pages", type: forge_class_1.ParamType.Json }],
            code: `
        $c[fresh view: page 1, newest first]
        $setField[this;history;$sortHistory[$env[pages];history_sort_endingdate]]
      `,
        },
        current: {
            code: `
        $return[$jsonGet[this;history;$math[$getField[this;page] - 1]]]
      `,
        },
        setPage: {
            params: [{ name: "page", type: forge_class_1.ParamType.Number }],
            code: `
        $c[wraps around]
        $let[count;$jsonSize[this;history]]
        $setField[this;page;$if[$env[page]<=0;$get[count];$if[$env[page]>$get[count];1;$env[page]]]]
      `,
        },
        turn: {
            params: [{ name: "step", type: forge_class_1.ParamType.Number }],
            code: `$callMethod[this;setPage;$math[$getField[this;page] + $env[step]]]`,
        },
        sortBy: {
            params: [
                { name: "sortType", type: forge_class_1.ParamType.String },
                { name: "rareAnimalId", type: forge_class_1.ParamType.String, required: false },
            ],
            code: `
        $setField[this;sortType;$env[sortType]]
        $if[$env[rareAnimalId]!=;$setField[this;rareAnimalId;$env[rareAnimalId]]]
        $callMethod[this;refresh]
      `,
        },
        orderBy: {
            params: [{ name: "order", type: forge_class_1.ParamType.String }],
            code: `
        $setField[this;sortOrder;$env[order]]
        $callMethod[this;refresh]
      `,
        },
        filterBy: {
            params: [
                { name: "rareAnimalId", type: forge_class_1.ParamType.String, required: false },
                { name: "pages", type: forge_class_1.ParamType.Json, required: false },
            ],
            code: `
        $c[new rare: filter all pages. no rare: refilter what's shown by the picked one]
        $if[$env[rareAnimalId]!=;$setField[this;rareAnimalId;$env[rareAnimalId]]]
        $if[$env[pages]!=;$setField[this;history;$env[pages]]]
        $setField[this;filter;true]
        $setField[this;page;1]
        $callMethod[this;refresh]
      `,
        },
        clearFilter: {
            params: [{ name: "pages", type: forge_class_1.ParamType.Json }],
            code: `
        $setField[this;history;$env[pages]]
        $setField[this;filter;false]
        $setField[this;page;1]
        $callMethod[this;refresh]
      `,
        },
        reload: {
            params: [{ name: "pages", type: forge_class_1.ParamType.Json }],
            code: `
        $setField[this;history;$env[pages]]
        $callMethod[this;refresh]
      `,
        },
        replaceCurrent: {
            params: [{ name: "page", type: forge_class_1.ParamType.Json }],
            code: `$!jsonSet[this;history;$math[$getField[this;page] - 1];$env[page]]`,
        },
        "private refresh": {
            code: `
        $c[filtered = only pages w/ the chosen rare, in the chosen order]
        $let[rareAnimalId;$jsonGet[this;rareAnimalId]]
        $if[$getField[this;filter];
          $setField[this;history;$arrayFilter[$getField[this;history];page;$jsonGet[page;raresList;$get[rareAnimalId]]!=]]
        ]
        $setField[this;history;$sortHistory[$getField[this;history];$getField[this;sortType];$get[rareAnimalId];$getField[this;sortOrder]]]
        $callMethod[this;setPage;$getField[this;page]]
      `,
        },
    },
});
//# sourceMappingURL=HistoryView.js.map