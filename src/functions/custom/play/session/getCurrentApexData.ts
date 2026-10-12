import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getCurrentApexData",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $jsonLoad[currentApex;$jsonGet[playData;apex]]
    $jsonLoad[allApex;$getGlobalVar[allApex]]
    $jsonLoad[darkApexEmojis;$getGlobalVar[darkApexEmojis]]
    $c[An apex the player has shows its emoji, the others their dark one]
    $arrayMap[allApex;apex;
      $return[$if[$arrayIncludes[currentApex;$env[apex]];$getAnimalInfo[$env[apex];emoji;0];$jsonGet[darkApexEmojis;$env[apex]]]]
    ;totalApex]

    $return[$objectOf[hasAllApex;$arrayEvery[allApex;apex;$arrayIncludes[currentApex;$env[apex]]];content;# $arrayJoin[totalApex; ]]]
  `
})
