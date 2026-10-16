import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addHeldSoccerMenu",
  description:
    "Adds the menus for a player holding a soccer: soccer actions + biome switch, or the actions menu once the tier XP is full (the soccer stays held for the upgrade)",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $jsonLoad[xpPerTier;$getGlobalVar[xpPerTier]]

    $if[$and[$jsonGet[playData;XP]>=$jsonGet[xpPerTier;$jsonGet[playData;tier];1];$jsonGet[playData;tier]!=17];
      $addActionsMenu[playData]
      $return
    ]

    $arrayLoad[soccerData;_;$jsonGet[playData;heldSoccer]]
    $addSoccerActionsMenu[$env[soccerData];true]
    $addBiomeMenu[playData]
  `,
})
