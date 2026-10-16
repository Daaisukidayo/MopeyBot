"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "pluralize",
    description: "Returns the correct form of a word based on the provided number, key and language.",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "number",
            description: "The number to determine the correct form for.",
            type: forgescript_1.ArgType.Number,
        },
        {
            name: "key",
            description: "The key for the word to pluralize.",
            type: forgescript_1.ArgType.String,
        },
        {
            name: "locale",
            description: "The locale to use for pluralization.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $jsonLoad[endingsMap;$getGlobalVar[endingsMap]]
    $if[$jsonGet[endingsMap;$env[locale];$env[key]]==;
      $return[❌ invalid key ($env[key])]
    ]

    $c[11-19 take the third form. Otherwise the last digit decides: 1 the first form, 2-4 the second, the others the third]
    $let[lastTwo;$math[$abs[$env[number]] % 100]]
    $let[last;$math[$get[lastTwo] % 10]]
    $return[$jsonGet[endingsMap;$env[locale];$env[key];$if[$inRange[$get[lastTwo];11;19];2;$if[$get[last]==1;0;$if[$inRange[$get[last];2;4];1;2]]]]]
  `,
});
//# sourceMappingURL=pluralize.js.map