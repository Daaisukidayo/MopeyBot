import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "shopPackCard",
  description:
    "draws a shop bundle like the game's: its rarest skins, rarity, name, skin count, icons, price with the discount, attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "packId",
      description: "the pack's ID from shopItems",
      type: ArgType.String,
    },
    {
      name: "skinsVar",
      description: "var with the user's skins, they make the pack cheaper",
      type: ArgType.String,
    },
    {
      name: "index",
      description: "the pack's place on the page, keeps the file names apart",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[userSkins;$env[skinsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[pack;$env[packId]]
    $let[canvas;shopPackCard$env[index]]
    $cacheAnimalsData
    $getCache[animals;packSkins;packSkins]
    $getCache[animals;skinInfo;skinInfo]
    $jsonLoad[rarityColors;$getGlobalVar[skinRarityColors]]
    $jsonLoad[rarities;$jsonKeys[rarityColors]]
    $jsonLoad[ids;$default[$jsonGet[packSkins;$get[pack]];$arrayOf]]

    $c[the game's rarity of each skin, skins the game doesn't sell are common. the pack is as rare as its rarest skin]
    $let[packRank;0]
    $arrayMap[ids;id;
      $jsonLoad[info;$jsonGet[skinInfo;$env[id]]]
      $let[rarity;$getAnimalInfo[$jsonGet[info;animal];rarity;$env[id]]]
      $let[rank;$arrayIndexOf[rarities;$if[$get[rarity]==undefined;common;$get[rarity]]]]
      $let[packRank;$max[$get[packRank];$get[rank]]]
      $!jsonSet[info;rank;$get[rank]]
      $return[$env[info]]
    ;infos]
    $let[rarity;$jsonGet[rarities;$get[packRank]]]
    $let[color;$jsonGet[rarityColors;$get[rarity]]]

    $c[rarest first, by name inside a rarity (the sort keeps the name order), one skin per animal so winter twins don't fill the preview]
    $jsonLoad[byRank;$arraySortBy[$arraySortBy[infos;asc;name];desc;rank]]
    $arrayLoad[seen]
    $arrayLoad[preview]
    $arrayForEach[byRank;info;
      $if[$arrayIncludes[seen;$jsonGet[info;animal]]==false;
        $arrayPush[seen;$jsonGet[info;animal]]
        $arrayPushJSON[preview;$env[info]]
      ]
    ]

    $let[name;$tl[data.shopSkinPacks.$get[pack].$get[l]]]
    $let[total;$jsonSize[ids]]
    $let[owned;$arrayCount[ids;skinId;$arrayIncludes[userSkins;$env[skinId]]]]
    $let[count;$if[$get[owned]>0;$tl[ui.shop.cardPackOwned.$get[l];$get[total];$get[owned]];$tl[ui.balance.cardSkins.$get[l];$get[total]]]]
    $let[price;$separate[$packPrice[$get[pack];userSkins]]]
    $let[discount;$default[$jsonGet[$arrayFind[$getGlobalVar[shopItems];item;$jsonGet[item;id]==$get[pack]];discount];0]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;230;
      $drawRect[;fill;$get[color];0;0;640;230;40]
      $drawRect[;fill;#17181c;4;4;632;222;36]
      $drawRect[;fill;#202227;14;14;282;202;28]

      $c[the rarest skin big in the middle with a glow, the next two on its sides behind it]
      $save
      $shadowOptions[;{"color":"$get[color]","blur":50}]
      $drawRect[;fill;$get[color];115;88;80;80;40]
      $drawRect[;fill;$get[color];115;88;80;80;40]
      $restore
      $if[$jsonSize[preview]>1;$drawImage[;$animalImagePath[$jsonGet[preview;1;animal];$jsonGet[preview;1;id]];22;96;100;100;0]]
      $if[$jsonSize[preview]>2;$drawImage[;$animalImagePath[$jsonGet[preview;2;animal];$jsonGet[preview;2;id]];188;96;100;100;0]]
      $drawImage[;$animalImagePath[$jsonGet[preview;0;animal];$jsonGet[preview;0;id]];83;58;144;144;0]

      $let[chip;$toUpperCase[$tl[data.skinRarities.$get[rarity].$get[l]]]]
      $drawRect[;fill;$get[color];24;24;$math[$measureText[;$get[chip];800 15px Nunito;width] + 20];26;8]
      $drawText[;fill;$get[chip];800 15px Nunito;#17181c;34;42]

      $c[long Russian names take 2 lines, the rest moves down]
      $let[twoLines;$and[$measureText[;$get[name];800 26px Nunito;width]>300]]
      $let[y;$if[$get[twoLines];38;50]]
      $drawText[;fill;$get[name];800 26px Nunito;#ffffff;316;$get[y];300;false;word]
      $if[$get[twoLines];$letSum[y;32]]
      $drawText[;fill;$get[count];800 20px Nunito;#b9bbc6;316;$math[$get[y] + 28];300]

      $c[5 icons like the game's, then how many more]
      $arrayForEach[$arraySlice[preview;;0;5];skin;
        $let[x;$math[316 + $env[i] * 50]]
        $drawRect[;fill;#24262b;$get[x];$math[$get[y] + 44];44;44;10]
        $drawImage[;$animalImagePath[$jsonGet[skin;animal];$jsonGet[skin;id]];$math[$get[x] + 3];$math[$get[y] + 47];38;38;0]
      ;i]
      $if[$get[total]>5;
        $drawRect[;fill;#24262b;566;$math[$get[y] + 44];50;44;10]
        $textAlign[;center]
        $drawText[;fill;+$math[$get[total] - 5];800 18px Nunito;#b9bbc6;591;$math[$get[y] + 72];44]
        $textAlign[;left]
      ]

      $drawImage[;res/assets/raretry/mopecoin.png;316;178;28;29;0]
      $drawText[;fill;$get[price];800 26px Nunito;#ffffff;352;202]
      $if[$get[discount]>0;
        $drawText[;fill;-$get[discount]%;800 20px Nunito;#7ee38c;$math[362 + $measureText[;$get[price];800 26px Nunito;width]];201]
      ]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
