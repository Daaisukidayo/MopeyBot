"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "sumRaresList",
    description: "Returns the totals of a rares list as an object with keys: 'points' and 'rares'.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "raresList",
            description: "Object of caught rare animals: their counts by their IDs.",
            type: forgescript_1.ArgType.Json
        }
    ],
    code: `
    $jsonLoad[entries;$jsonEntries[raresList]]
    $return[$objectOf[points;$arraySum[$arrayMap[entries;entry;$return[$math[$jsonGet[$getChallengeRare[$jsonGet[entry;0]];points] * $jsonGet[entry;1]]]]];rares;$arraySum[entries;1]]]
  `
});
//# sourceMappingURL=sumRaresList.js.map