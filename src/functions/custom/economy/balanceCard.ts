import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "balanceCard",
  description:
    "draws the /balance card (coins, skins + bundles, then the bundle list or a page of skins), attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "skins",
      description: "how many skins the skins tab lists",
      type: ArgType.Number,
    },
    {
      name: "view",
      description: "'packs' lists the bought bundles, 'skins' the page's skins",
      type: ArgType.String,
    },
    {
      name: "pageVar",
      description: "skins view: var with the page's skins (catalog-like objects)",
      type: ArgType.String,
      required: false,
    },
  ],
  code: `
    $let[l;$jsonGet[userProfile;language]]
    $let[canvas;balanceCard]
    $let[color;$getGlobalVar[defaultColor]]
    $let[stats;$tl[ui.balance.cardSkins.$get[l];$env[skins]] · $tl[ui.balance.cardPacks.$get[l];$jsonSize[userProfile;user_packs]]]
    $let[isPacks;$and[$env[view]==packs]]

    $if[$get[isPacks];
      $c[the list goes in 2 columns, top to bottom then the next column, or 1 if a name doesn't fit half the width (long Russian names)]
      $arrayMap[$jsonGet[userProfile;user_packs];pack;$return[$tl[data.shopSkinPacks.$env[pack].$get[l]]];packs]
      $c[text can only be measured on a canvas, so a throwaway one]
      $let[widest;0]
      $createCanvas[balanceMeasure;1;1;
        $arrayForEach[packs;name;
          $let[widest;$max[$get[widest];$measureText[;$env[name];800 22px Nunito;width]]]
        ]
      ]
      $deleteCanvas[balanceMeasure]
      $let[columnCount;$if[$get[widest]<=274;2;1]]
      $let[columnWidth;$if[$get[columnCount]==2;274;572]]
      $let[rows;$max[1;$ceil[$math[$jsonSize[packs] / $get[columnCount]]]]]
      $jsonLoad[columns;$arrayChunk[packs;$get[rows]]]
      $let[empty;$and[$jsonSize[packs]==0]]
      $let[height;$math[164 + $get[rows] * 34]]
    ;
      $ref[page;$env[pageVar]]
      $let[empty;$and[$jsonSize[page]==0]]
      $let[height;$if[$get[empty];198;$math[156 + $jsonSize[page] * 72]]]
    ]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;$get[height];
      $drawRect[;fill;$get[color];0;0;640;$get[height];40]
      $drawRect[;fill;#17181c;4;4;632;$math[$get[height] - 8];36]

      $drawImage[;res/assets/raretry/mopecoin.png;32;26;48;50;0]
      $drawText[;fill;$separate[$jsonGet[userProfile;mope_coins]];800 52px Nunito;$get[color];96;70;512]
      $drawText[;fill;$get[stats];800 26px Nunito;#b9bbc6;34;114;572]
      $drawRect[;fill;#2b2d31;34;136;572;2;0]

      $if[$get[empty];
        $drawText[;fill;$tl[ui.balance.none.$get[l]];800 22px Nunito;#b9bbc6;34;176;572]
      ]
      $if[$get[isPacks];
        $arrayForEach[columns;column;
          $arrayForEach[column;name;
            $drawText[;fill;$env[name];800 22px Nunito;#ffffff;$math[34 + $env[c] * 298];$math[176 + $env[r] * 34];$get[columnWidth]]
          ;r]
        ;c]
      ;
        $c[a row per skin like the text list had: picture, name, the animal under it]
        $arrayForEach[page;skin;
          $let[y;$math[152 + $env[i] * 72]]
          $drawImage[;$animalImagePath[$jsonGet[skin;animal];$jsonGet[skin;id]];34;$get[y];56;56;0]
          $drawText[;fill;$jsonGet[skin;name];800 26px Nunito;#ffffff;104;$math[$get[y] + 26];502]
          $drawText[;fill;$tl[ui.balance.cardSkinFor.$get[l];$getAnimalInfo[$jsonGet[skin;animal];fullName]];800 20px Nunito;#b9bbc6;104;$math[$get[y] + 52];502]
        ;i]
      ]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
