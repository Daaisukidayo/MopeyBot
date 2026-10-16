"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getRareAnimalID",
    description: "Returns the rare animal's ID based on one of its abbreviations from the snora command.",
    output: forgescript_1.ArgType.String,
    params: [
        {
            name: "alias",
            description: "Abbreviation of the rare animal.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $c[Checked against the list first: user input could name a key like 'constructor']
    $getCache[rares;allRares;allRares]
    $if[$arrayIncludes[allRares;$env[alias]]==false;$return[undefined]]

    $getCache[rares;rareByAbbreviation;rareByAbbreviation]
    $return[$jsonGet[rareByAbbreviation;$env[alias]]]
  `,
});
//# sourceMappingURL=getRareAnimalID.js.map