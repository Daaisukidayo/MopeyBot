"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getRareAnimalID",
    description: "the rare's ID from one of its abbreviations (see snora)",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "alias",
            description: "the rare's abbreviation",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $c[check the list first, user input could be stuff like 'constructor']
    $getCache[rares;allRares;allRares]
    $if[$arrayIncludes[allRares;$env[alias]]==false;$return[undefined]]

    $getCache[rares;rareByAbbreviation;rareByAbbreviation]
    $return[$jsonGet[rareByAbbreviation;$env[alias]]]
  `,
});
//# sourceMappingURL=getRareAnimalID.js.map