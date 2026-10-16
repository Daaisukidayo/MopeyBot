"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
const SUFFIX_MAP = {
    "en-US": { one: "st", two: "nd", few: "rd", other: "th", zero: "th", many: "th" },
    ru: { one: "-й", two: "-й", few: "-й", other: "-й", zero: "-й", many: "-й" },
};
exports.default = new forgescript_1.NativeFunction({
    name: "$advancedOrdinal",
    description: "Returns the ordinal representation of a number based on the language.",
    output: forgescript_1.ArgType.String,
    brackets: true,
    unwrap: true,
    args: [
        {
            name: "number",
            description: "The number to convert to an ordinal representation.",
            type: forgescript_1.ArgType.Number,
            required: true,
            rest: false,
        },
        {
            name: "language",
            description: "The language code used for the ordinal format. Defaults to en-US",
            type: forgescript_1.ArgType.String,
            required: false,
            rest: false,
        },
    ],
    execute: async function (ctx, [number, language]) {
        const [langPart, regionPart] = (language ?? "en-US").split("-");
        language = regionPart ? `${langPart.toLowerCase()}-${regionPart.toUpperCase()}` : langPart.toLowerCase();
        const rule = new Intl.PluralRules(language, { type: "ordinal" }).select(number);
        const langSuffixes = SUFFIX_MAP[language] || SUFFIX_MAP["en-US"];
        const suffix = langSuffixes[rule] || langSuffixes["other"];
        return this.success(`${number}${suffix}`);
    },
});
//# sourceMappingURL=advancedOrdinal.js.map