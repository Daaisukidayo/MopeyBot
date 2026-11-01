import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "enterHallOfFame",
  description: "adds the rare enough parts of the author's roll to the hall of fame",
  params: [
    {
      name: "game",
      description: "raretry, raretryrun, pumpkin, umbrella or beachball",
      type: ArgType.String,
    },
    {
      name: "roll",
      description: "the roll, same as recordRoll gets it",
      type: ArgType.Json,
    },
  ],
  code: `
    $c[the soccer item or each raretry rare, if it's at least as rare as the threshold]
    $let[minChance;$jsonGet[$getGlobalVar[hallOfFameMinChance];$env[game]]]
    $if[$jsonHas[roll;item];
      $arrayLoad[candidates]
      $arrayPushJSON[candidates;$objectOf[id;$jsonGet[roll;item];chance;$jsonGet[roll;chance]]]
    ;
      $jsonLoad[candidates;$jsonGet[roll;rares]]
    ]
    $arrayFilter[candidates;candidate;$jsonGet[candidate;chance]>=$get[minChance];famous]
    $if[$jsonSize[famous]==0;$return]

    $jsonLoad[hallOfFame;$getGlobalVar[hallOfFame]]
    $arrayForEach[famous;candidate;
      $arrayPushJSON[hallOfFame;$objectOf[game;$env[game];user;$authorID;id;$jsonGet[candidate;id];chance;$jsonGet[candidate;chance];at;$jsonGet[roll;at]]]
    ]

    $c[rarest first, earlier wins ties: sort by time, then a stable sort by rarity]
    $jsonLoad[hallOfFame;$arraySortBy[$arraySortBy[hallOfFame;asc;at];desc;chance]]
    $setGlobalVar[hallOfFame;$arraySlice[hallOfFame;;0;$getGlobalVar[hallOfFameSize]]]
  `,
})
