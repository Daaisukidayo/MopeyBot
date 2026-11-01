import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "generateList",
  description: "returns 'l' (rares in the animals order), 'p' (points) and 'r' (rares)",
  output: ArgType.Json,
  params: [
    {
      name: "raresList",
      description: "caught rares",
      type: ArgType.Json,
    },
  ],
  code: `
    $jsonLoad[totals;$sumRaresList[$env[raresList]]]

    $arrayMap[$jsonEntries[$sortList[$env[raresList]]];entry;
      $return[$getAnimalInfo[$jsonGet[entry;0];emoji;0]\`$jsonGet[entry;1]\`]
    ;list]

    $if[$jsonSize[list]==0;
      $arrayPush[list;$tl[ui.challenge.none.$jsonGet[userProfile;language]]]
    ]

    $return[$objectOf[l;$env[list];p;$jsonGet[totals;points];r;$jsonGet[totals;rares]]]
  `,
})
