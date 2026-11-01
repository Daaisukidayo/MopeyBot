import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getChallengeRare",
  description: "looks up an animal in the challenge data, returns its object",
  output: ArgType.Json,
  params: [
    {
      name: "animalId",
      description: "animal ID from animals.json",
      type: ArgType.String,
    },
  ],
  code: `
    $getCache[rares;challengeRares;challengeRares]
    $c[not a challenge rare: 0 points, no category]
    $let[rare;$jsonGet[challengeRares;$env[animalId]]]
    $return[$if[$get[rare]==;$objectOf[points;0;category;-1];$get[rare]]]
  `,
})
