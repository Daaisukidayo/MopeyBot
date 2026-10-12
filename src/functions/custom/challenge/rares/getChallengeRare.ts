import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getChallengeRare",
  description: "Searches animal in challenge database, returns object.",
  output: ArgType.Json,
  params: [
    {
      name: "animalId",
      description: "Animal identifier from '/animals.json'.",
      type: ArgType.String
    }
  ],
  code: `    
    $getCache[rares;challengeRares;challengeRares]
    $c[A rare outside the challenge gives no points and has no category]
    $let[rare;$jsonGet[challengeRares;$env[animalId]]]
    $return[$if[$get[rare]==;$objectOf[points;0;category;-1];$get[rare]]]
  `
})
