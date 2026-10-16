import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "getSoccerMC",
  description:
    "Returns a random coin reward for a soccer: the goal coins of the player's tier (soccerGoalMC), a share of them for a hold (soccerHoldMCShare), times the soccer's multiplier",
  output: ArgType.Number,
  brackets: true,
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String,
    },
    {
      name: "soccerType",
      description: "The soccer type (e.g. 'pumpkin', 'umbrella', 'beachball')",
      type: ArgType.String,
    },
    {
      name: "soccerId",
      description: "The ID of the soccer item",
      type: ArgType.Number,
    },
    {
      name: "action",
      description: "What the reward is for: 'goal' or 'hold'",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $let[multiplier;$jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];mcMultiplier]]
    $let[share;$if[$env[action]==hold;$getGlobalVar[soccerHoldMCShare];1]]
    $jsonLoad[reward;$jsonGet[$getGlobalVar[soccerGoalMC];$jsonGet[playData;tier]]]
    $return[$round[$math[$random[$jsonGet[reward;0];$jsonGet[reward;1]] * $get[share] * $get[multiplier]]]]
  `,
})
