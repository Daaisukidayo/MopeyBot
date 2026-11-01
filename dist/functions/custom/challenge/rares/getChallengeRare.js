"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getChallengeRare",
    description: "looks up an animal in the challenge data, returns its object",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "animalId",
            description: "animal ID from animals.json",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `
    $getCache[rares;challengeRares;challengeRares]
    $c[not a challenge rare: 0 points, no category]
    $let[rare;$jsonGet[challengeRares;$env[animalId]]]
    $return[$if[$get[rare]==;$objectOf[points;0;category;-1];$get[rare]]]
  `,
});
//# sourceMappingURL=getChallengeRare.js.map