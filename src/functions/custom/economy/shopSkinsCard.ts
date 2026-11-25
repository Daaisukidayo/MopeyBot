import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "shopSkinsCard",
  description:
    "draws one row of the shop's skins (skin, name, rarity, price) framed in their rarity colors, attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "skinsVar",
      description: "var with the row's skins (catalog-like objects), 1 to 4",
      type: ArgType.String,
    },
    {
      name: "index",
      description: "row index, keeps the file names apart",
      type: ArgType.Number,
    },
  ],
  code: `
    $ref[skins;$env[skinsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[canvas;shopSkinsCard$env[index]]
    $jsonLoad[rarityColors;$getGlobalVar[skinRarityColors]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;250;
      $textAlign[;center]
      $c[4 tiles of 151 + 12 gap fill 640. a short row starts at the left like its buttons below]
      $arrayForEach[skins;skin;
        $let[x;$math[$env[col] * 163]]
        $let[cx;$math[$get[x] + 75.5]]
        $c[the game's rarity, skins the game doesn't sell are common like its default skins]
        $let[rarity;$getAnimalInfo[$jsonGet[skin;animal];rarity;$jsonGet[skin;id]]]
        $let[rarity;$if[$get[rarity]==undefined;common;$get[rarity]]]
        $let[color;$jsonGet[rarityColors;$get[rarity]]]

        $drawRect[;fill;$get[color];$get[x];0;151;250;24]
        $drawRect[;fill;#17181c;$math[$get[x] + 3];3;145;244;21]

        $c[same glow as the raretry card, a hidden circle under the skin]
        $save
        $shadowOptions[;{"color":"$get[color]","blur":40}]
        $drawRect[;fill;$get[color];$math[$get[cx] - 30];40;60;60;30]
        $drawRect[;fill;$get[color];$math[$get[cx] - 30];40;60;60;30]
        $restore

        $drawImage[;$animalImagePath[$jsonGet[skin;animal];$jsonGet[skin;id]];$math[$get[cx] - 55];14;110;110;0]
        $drawText[;fill;$jsonGet[skin;name];800 22px Nunito;#ffffff;$get[cx];156;139]
        $drawText[;fill;$tl[data.skinRarities.$get[rarity].$get[l]];800 20px Nunito;$get[color];$get[cx];186;139]

        $c[the price is on the button under the tile too, here it tells which button is whose]
        $if[$jsonGet[skin;cost]==0;
          $drawText[;fill;$tl[ui.shop.free.$get[l]];800 20px Nunito;#b9bbc6;$get[cx];226;139]
        ;
          $let[price;$separate[$jsonGet[skin;cost]]]
          $c[coin picture + text centered together]
          $let[coinX;$math[$get[cx] - (26 + $measureText[;$get[price];800 20px Nunito;width]) / 2]]
          $drawImage[;res/assets/raretry/mopecoin.png;$get[coinX];208;20;21;0]
          $textAlign[;left]
          $drawText[;fill;$get[price];800 20px Nunito;#b9bbc6;$math[$get[coinX] + 26];226]
          $textAlign[;center]
        ]
      ;col]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
