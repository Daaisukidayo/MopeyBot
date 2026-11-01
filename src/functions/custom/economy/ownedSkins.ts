import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "ownedSkins",
  description: "the user's skins (catalog-like objects), sorted like the shop's. removed skins drop out",
  output: ArgType.Json,
  params: [
    {
      name: "skinsVar",
      description: "var w/ the user's skins",
      type: ArgType.String,
    },
    {
      name: "skip",
      description: "pack or packless group ids to leave out, as a JSON array",
      type: ArgType.Json,
      required: false,
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
    $jsonLoad[skipped;$default[$env[skip];$arrayOf]]
    $cacheAnimalsData
    $getCache[animals;packSkins;packSkins]
    $getCache[animals;skinCatalog;catalog]
    $getCache[animals;skinInfo;skinInfo]

    $c[collection order like the shop's: packs, then the packless groups. packs go by packSkins bc the catalog only has skins sold alone, legacy's winter + oldest skins ride along]
    $jsonLoad[collections;$arrayPluck[$getGlobalVar[shopItems];id]]
    $arrayForEach[$getGlobalVar[skinCollections];collection;$arrayPush[collections;$env[collection]]]
    $arrayLoad[added]
    $arrayLoad[list]
    $arrayForEach[collections;collection;
      $if[$arrayIncludes[skipped;$env[collection]]==false;
        $jsonLoad[ids;$default[$jsonGet[packSkins;$env[collection]];$arrayPluck[$default[$jsonGet[catalog;$env[collection]];$arrayOf];id]]]
        $arrayForEach[ids;skinId;
          $if[$and[$arrayIncludes[owned;$env[skinId]];$arrayIncludes[added;$env[skinId]]==false];
            $arrayPush[added;$env[skinId]]
            $arrayPushJSON[list;$jsonGet[skinInfo;$env[skinId]]]
          ]
        ]
      ]
    ]
    $return[$sortSkins[list;$env[sort];$env[order]]]
  `,
})
