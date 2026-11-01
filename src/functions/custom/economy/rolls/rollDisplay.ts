import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "rollDisplay",
  description: "what a roll got, w/ its emoji: a raretry/raretryrun rare or a soccer's item",
  output: ArgType.String,
  params: [
    {
      name: "game",
      description: "raretry, raretryrun, pumpkin, umbrella or beachball",
      type: ArgType.String,
    },
    {
      name: "id",
      description: "the rare's animal ID or the soccer item's ID",
      type: ArgType.String,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $if[$isOneOf[$env[game];raretry;raretryrun];
      $return[$getAnimalInfo[$env[id];emoji;0] $getAnimalInfo[$env[id];name;0]]
    ]
    $c[soccer item: emoji from the data file, name from locale]
    $let[emoji;$jsonGet[$arrayFind[$readFile[res/data/$env[game]s.json];item;$jsonGet[item;id]==$env[id]];emoji]]
    $return[$get[emoji] $tl[data.$env[game]s.$env[id].$get[l]]]
  `,
})
