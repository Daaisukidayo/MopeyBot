import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getSoccerStealChance",
  description: "per-mille chance the soccer gets stolen: rarer ones get stolen more, a higher tier protects better",
  output: ArgType.Number,
  brackets: true,
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "soccerType",
      description: "the soccer type, like 'pumpkin', 'umbrella' or 'beachball'",
      type: ArgType.String,
    },
    {
      name: "soccerId",
      description: "the soccer item's ID",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $jsonLoad[lossChances;$getGlobalVar[soccerLossChances]]
    $let[tierFactor;$max[$jsonGet[lossChances;stealMinTierFactor];$math[1 - $jsonGet[lossChances;stealTierReduction] * ($jsonGet[playData;tier] - 1)]]]
    $c[rank = how many soccers of this type are more common]
    $let[chance;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];chance]]
    $let[rank;$arrayCount[$jsonGet[$readFile[res/data/playSoccers.json];$env[soccerType]];item;$jsonGet[item;chance]>$get[chance]]]
    $return[$round[$math[($jsonGet[lossChances;stealBase] + $jsonGet[lossChances;stealPerRarity] * $get[rank]) * $get[tierFactor]]]]
  `,
})
