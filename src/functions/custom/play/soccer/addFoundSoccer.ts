import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addFoundSoccer",
  description: "adds the 'found a soccer' screen: its rarity, the animal stats and the soccer actions menu",
  brackets: true,
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "wardrobeVar",
      description: "var w/ the user's wardrobe",
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
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]

    $c[freshly found, not held yet]
    $callMethod[playData;dropSoccer]

    $c[show rarity as 1 in N, rounded from the %]
    $let[rarity;$round[$math[100 / $jsonGet[$getPlaySoccer[$env[soccerType];$env[soccerId]];chance]]]]
    $arrayLoad[soccerData;_;$env[soccerType]_$env[soccerId]]

    $addSoccerSection[$env[soccerType];$env[soccerId];$tl[ui.play.found.$get[l];$getSoccerDisplay[$env[soccerType];$env[soccerId]]]]
    $if[$get[rarity]>1;
      $addTextDisplay[$tl[ui.$env[soccerType].rarity.$get[l];1;$separate[$get[rarity]]]]
    ]
    $addSeparator[Large]

    $displayAnimalStats[playData;wardrobe]
    $addSoccerActionsMenu[playData;$env[soccerData]]
  `,
})
