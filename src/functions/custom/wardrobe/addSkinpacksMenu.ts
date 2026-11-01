import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addSkinpacksMenu",
  description: "a page of the user's skin packs for one tier or all of them, each w/ an Equip button",
  params: [
    {
      name: "tier",
      description: "a tier number or 'all'",
      type: ArgType.String,
    },
    {
      name: "page",
      description: "the page, wraps around when out of range. 1 by default",
      type: ArgType.Number,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[tier;$env[tier]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $c[per pack: how many of the tier's animals it can dress in an owned skin]
    $jsonLoad[dressed;$objectOf]
    $arrayForEach[animals;animal;
      $if[$or[$get[tier]==all;$jsonGet[animal;tier]==$get[tier]];
        $arrayLoad[counted]
        $arrayForEach[$default[$jsonGet[animal;skins];$arrayOf];skin;
          $let[pack;$jsonGet[skin;packId]]
          $if[$and[$get[pack]!=;$arrayIncludes[counted;$get[pack]]==false;$or[$arrayIncludes[freePacks;$get[pack]];$arrayIncludes[userSkins;$jsonGet[skin;id]]]];
            $arrayPush[counted;$get[pack]]
            $!jsonSet[dressed;$get[pack];$math[$default[$jsonGet[dressed;$get[pack]];0] + 1]]
          ]
        ]
      ]
    ]

    $c[free packs first, then shop order (legacy winter + oldest right after legacy). packs that dress nobody here get skipped]
    $jsonLoad[order;$getGlobalVar[freeSkinPacks]]
    $arrayForEach[$getGlobalVar[shopItems];item;
      $arrayPush[order;$jsonGet[item;id]]
      $if[$jsonGet[item;id]==legacySP;$arrayPush[order;legacySPw;oldestSP]]
    ]
    $arrayFilter[order;pack;$default[$jsonGet[dressed;$env[pack]];0]>0;packs]

    $c[pages wrap around]
    $let[pageSize;$getGlobalVar[wardrobePacksPageSize]]
    $let[pages;$max[1;$arrayPageCount[packs;$get[pageSize]]]]
    $let[page;$nullish[$env[page];1]]
    $let[page;$if[$get[page]<1;$get[pages];$if[$get[page]>$get[pages];1;$get[page]]]]

    $if[$jsonSize[packs]==0;$addTextDisplay[$tl[ui.wardrobe.noPacks.$get[l]]]]
    $arrayForEach[$arrayPage[packs;$get[page];$get[pageSize]];pack;
      $addSection[
        $addTextDisplay[$tl[ui.wardrobe.packLine.$get[l];$tl[data.shopSkinPacks.$env[pack].$get[l]];$jsonGet[dressed;$env[pack]]]]
        $addButton[wardrobe-tier-$get[tier]-$authorID-$env[pack]-$get[page];$tl[ui.wardrobe.buttonEquip.$get[l]];Success]
      ]
    ]

    $if[$get[pages]>1;
      $addActionRow
      $addButton[wardrobe-packsPage-$get[tier]-$authorID-$math[$get[page] - 1];;Primary;⬅️]
      $addButton[wardrobe-pageInfo-$get[tier]-$authorID;$tl[ui.wardrobe.pageButton.$get[l];$get[page];$get[pages]];Secondary;;true]
      $addButton[wardrobe-packsPage-$get[tier]-$authorID-$math[$get[page] + 1];;Primary;➡️]
    ]
  `,
})
