import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "recordRoll",
  description:
    "records the author's roll: history and stats (see the Rolls class), plus the hall of fame if it's rare enough",
  params: [
    {
      name: "game",
      description: "raretry, raretryrun, pumpkin, umbrella or beachball",
      type: ArgType.String,
    },
    {
      name: "roll",
      description:
        "the roll: { at, rares: [{ id, chance }], mope_coins } for raretry (+ its mode) and raretryrun, { at, item, chance, mope_coins } for a soccer. chance = N of 1 in N",
      type: ArgType.Json,
    },
  ],
  code: `
    $new[rolls;Rolls;$authorID]
    $callMethod[rolls;record;$env[game];$env[roll]]
    $callMethod[rolls;save]
    $enterHallOfFame[$env[game];$env[roll]]
  `,
})
