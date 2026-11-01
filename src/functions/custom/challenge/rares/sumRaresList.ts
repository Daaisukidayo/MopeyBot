import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "sumRaresList",
  description: "totals of a rares list: 'points' and 'rares'",
  output: ArgType.Json,
  params: [
    {
      name: "raresList",
      description: "caught rares as counts by ID",
      type: ArgType.Json,
    },
  ],
  code: `
    $jsonLoad[entries;$jsonEntries[raresList]]
    $return[$objectOf[points;$arraySum[$arrayMap[entries;entry;$return[$math[$jsonGet[$getChallengeRare[$jsonGet[entry;0]];points] * $jsonGet[entry;1]]]]];rares;$arraySum[entries;1]]]
  `,
})
