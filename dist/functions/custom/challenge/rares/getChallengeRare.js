"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const forgescript_1 = require("@tryforge/forgescript");
exports.default = new forgescript_1.ForgeFunction({
    name: "getChallengeRare",
    description: "Searches animal in challenge database, returns object.",
    output: forgescript_1.ArgType.Json,
    params: [
        {
            name: "animalId",
            description: "Animal identifier from '/animals.json'.",
            type: forgescript_1.ArgType.String,
        },
    ],
    code: `    
    $getCache[rares;challengeRares;challengeRares]
    $c[A rare outside the challenge gives no points and has no category]
    $let[rare;$jsonGet[challengeRares;$env[animalId]]]
    $return[$if[$get[rare]==;$objectOf[points;0;category;-1];$get[rare]]]
  `,
});
//# sourceMappingURL=getChallengeRare.js.map