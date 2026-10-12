import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sumRaresList",
  description: "Returns the totals of a rares list as an object with keys: 'points' and 'rares'.",
  output: ArgType.Json,
  params: [
    {
      name: "raresList",
      description: "Object of caught rare animals: their counts by their IDs.",
      type: ArgType.Json
    }
  ],
  code: `
    $jsonLoad[entries;$jsonEntries[raresList]]
    $return[$objectOf[points;$arraySum[$arrayMap[entries;entry;$return[$math[$jsonGet[$getChallengeRare[$jsonGet[entry;0]];points] * $jsonGet[entry;1]]]]];rares;$arraySum[entries;1]]]
  `
})
