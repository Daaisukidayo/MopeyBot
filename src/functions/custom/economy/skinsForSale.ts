import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "skinsForSale",
  description: "the skins the user can still buy alone (not owned, not from a bought pack), sorted",
  output: ArgType.Json,
  params: [
    {
      name: "skinsVar",
      description: "var w/ the user's skins",
      type: ArgType.String,
    },
    {
      name: "sort",
      description: "one of shopSortingOptions, shop_sort_collection by default",
      type: ArgType.String,
      required: false,
    },
    {
      name: "order",
      description: "asc (default) or desc",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $ref[owned;$env[skinsVar]]
    $jsonLoad[packs;$jsonGet[userProfile;user_packs]]
    $cacheAnimalsData
    $getCache[animals;skinCatalog;catalog]

    $c[collection order: packs in shop order, then the packless ones]
    $jsonLoad[collections;$arrayPluck[$getGlobalVar[shopItems];id]]
    $arrayForEach[$getGlobalVar[skinCollections];collection;$arrayPush[collections;$env[collection]]]
    $arrayLoad[list]
    $arrayForEach[collections;collection;
      $if[$arrayIncludes[packs;$env[collection]]==false;
        $arrayForEach[$default[$jsonGet[catalog;$env[collection]];$arrayOf];skin;
          $if[$arrayIncludes[owned;$jsonGet[skin;id]]==false;$arrayPushJSON[list;$env[skin]]]
        ]
      ]
    ]

    $return[$sortSkins[list;$env[sort];$env[order]]]
  `,
})
