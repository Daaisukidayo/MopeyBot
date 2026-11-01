import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "packPrice",
  description: "a pack's price after its discount and the skins the user already has. empty for an unknown pack",
  output: ArgType.Unknown,
  params: [
    {
      name: "packId",
      description: "the pack's id from shopItems",
      type: ArgType.String,
    },
    {
      name: "skinsVar",
      description: "var w/ the user's skins. w/o it you get the whole pack's price",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $jsonLoad[items;$getGlobalVar[shopItems]]
    $let[index;$arrayFindIndex[items;item;$jsonGet[item;id]==$env[packId]]]
    $if[$get[index]==-1;$return]
    $let[price;$math[$jsonGet[items;$get[index];cost] * (100 - $default[$jsonGet[items;$get[index];discount];0]) / 100]]

    $c[packs w/o skins sold one by one, like Classic, never shrink]
    $cacheAnimalsData
    $getCache[animals;skinCatalog;catalog]
    $jsonLoad[priced;$default[$jsonGet[catalog;$env[packId]];$arrayOf]]
    $if[$or[$env[skinsVar]==;$jsonSize[priced]==0];$return[$round[$get[price]]]]

    $c[owned skins knock their share off. share = the skin's single price, pack-only ones count as the pack's average so it never goes free]
    $ref[owned;$env[skinsVar]]
    $getCache[animals;packSkins;packSkins]
    $jsonLoad[packIds;$default[$jsonGet[packSkins;$env[packId]];$arrayOf]]
    $let[average;$math[$arraySum[priced;cost] / $jsonSize[priced]]]
    $let[total;$math[$arraySum[priced;cost] + ($jsonSize[packIds] - $jsonSize[priced]) * $get[average]]]
    $if[$get[total]<=0;$return[$round[$get[price]]]]

    $let[ownedValue;0]
    $let[ownedPriced;0]
    $arrayForEach[priced;skin;
      $if[$arrayIncludes[owned;$jsonGet[skin;id]];
        $letSum[ownedValue;$jsonGet[skin;cost]]
        $letSum[ownedPriced;1]
      ]
    ]
    $let[ownedAll;$arrayCount[packIds;skinId;$arrayIncludes[owned;$env[skinId]]]]
    $letSum[ownedValue;$math[($get[ownedAll] - $get[ownedPriced]) * $get[average]]]

    $return[$round[$math[$get[price] * ($get[total] - $get[ownedValue]) / $get[total]]]]
  `,
})
