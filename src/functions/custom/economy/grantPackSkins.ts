import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "grantPackSkins",
  description: "adds all the packs' skins to the user's, returns how many were new",
  output: ArgType.Number,
  params: [
    {
      name: "skinsVar",
      description: "var w/ the user's skins",
      type: ArgType.String,
    },
    {
      name: "packsVar",
      description: "var w/ the pack ids",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[skins;$env[skinsVar]]
    $ref[packs;$env[packsVar]]
    $cacheAnimalsData
    $getCache[animals;packSkins;packSkins]

    $let[added;0]
    $arrayForEach[packs;pack;
      $arrayForEach[$default[$jsonGet[packSkins;$env[pack]];$arrayOf];skinId;
        $if[$arrayIncludes[skins;$env[skinId]]==false;
          $arrayPush[skins;$env[skinId]]
          $letSum[added;1]
        ]
      ]
    ]
    $return[$get[added]]
  `,
})
