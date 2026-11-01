"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "findAnimalId",
    description: "the ID of the animal or rare w/ this name or ID, any case, spaces or underscores. nothing if there's none",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "text",
            description: "the name or ID to look for",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]
    $let[query;$toCamelCase[$env[text]]]
    $let[index;$arrayFindIndex[animals;animal;$or[$toCamelCase[$jsonGet[animal;fullName]]==$get[query];$toCamelCase[$jsonGet[animal;ID]]==$get[query]]]]
    $if[$get[index]==-1;$return]
    $return[$jsonGet[animals;$get[index];ID]]
  `,
});
//# sourceMappingURL=findAnimalId.js.map