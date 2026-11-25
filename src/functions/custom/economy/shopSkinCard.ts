import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "shopSkinCard",
  description:
    "draws one shop skin big, like the raretry card (skin, name, rarity, price) framed in its rarity color, attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "skinVar",
      description: "var with the skin (a catalog-like object: animal, id, name, cost)",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[skin;$env[skinVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[canvas;shopSkinCard]
    $c[the game's rarity, skins the game doesn't sell are common like its default skins]
    $let[rarity;$getAnimalInfo[$jsonGet[skin;animal];rarity;$jsonGet[skin;id]]]
    $let[rarity;$if[$get[rarity]==undefined;common;$get[rarity]]]
    $let[color;$jsonGet[$getGlobalVar[skinRarityColors];$get[rarity]]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;200;
      $drawRect[;fill;$get[color];0;0;640;200;40]
      $drawRect[;fill;#17181c;4;4;632;192;36]

      $c[same glow as the raretry card, a hidden circle under the skin]
      $save
      $shadowOptions[;{"color":"$get[color]","blur":60}]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $restore

      $drawImage[;$animalImagePath[$jsonGet[skin;animal];$jsonGet[skin;id]];30;20;160;160;0]
      $drawText[;fill;$jsonGet[skin;name];800 44px Nunito;#ffffff;220;78;390]
      $drawText[;fill;$tl[data.skinRarities.$get[rarity].$get[l]];800 30px Nunito;$get[color];220;122;390]

      $if[$jsonGet[skin;cost]==0;
        $drawText[;fill;$tl[ui.shop.free.$get[l]];800 26px Nunito;#b9bbc6;220;166;390]
      ;
        $drawImage[;res/assets/raretry/mopecoin.png;220;144;25;26;0]
        $drawText[;fill;$separate[$jsonGet[skin;cost]];800 26px Nunito;#b9bbc6;253;166;357]
      ]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
