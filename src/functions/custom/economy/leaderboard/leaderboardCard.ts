import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "leaderboardCard",
  description:
    "draws a leaderboard page (place, avatar, name, the table's value per row), attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "rowsVar",
      description: "var with the page's rows, not empty",
      type: ArgType.String,
    },
    {
      name: "type",
      description: "the table, a key of leaderboardTypes",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[rows;$env[rowsVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[canvas;leaderboardCard]
    $let[type;$env[type]]
    $let[isSoccer;$and[$isOneOf[$get[type];pumpkin;umbrella;beachball]]]
    $c[collection = every item across all 3 soccer games]
    $let[collectionSize;$math[$jsonSize[$readFile[res/data/pumpkins.json]] + $jsonSize[$readFile[res/data/umbrellas.json]] + $jsonSize[$readFile[res/data/beachballs.json]]]]
    $c[gold, silver, bronze, then grey]
    $arrayLoad[placeColors;,;#FFD700,#C9D1D9,#D08A4B]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];800;$math[$jsonSize[rows] * 72 - 8];
      $arrayForEach[rows;elem;
        $let[y;$math[$env[i] * 72]]
        $let[pos;$jsonGet[elem;pos]]
        $let[placeColor;$nullish[$jsonGet[placeColors;$math[$get[pos] - 1]];#b9bbc6]]

        $c[top 3 get a frame in their medal color]
        $if[$get[pos]<=3;
          $drawRect[;fill;$get[placeColor];0;$get[y];800;64;20]
          $drawRect[;fill;#17181c;3;$math[$get[y] + 3];794;58;17]
        ;
          $drawRect[;fill;#17181c;0;$get[y];800;64;20]
        ]

        $textAlign[;center]
        $drawText[;fill;$get[pos];800 28px Nunito;$get[placeColor];44;$math[$get[y] + 43];60]

        $c[an avatar that can't load doesn't throw, it fills its circle with the last fill color, so grey goes right before it]
        $drawRect[;fill;#2b2d31;84;$math[$get[y] + 8];48;48;24]
        $drawImage[;$userAvatar[$jsonGet[elem;user_id];64;png];84;$math[$get[y] + 8];48;48;24]

        $c[value on the right, with the coin or the soccer item picture before it]
        $let[pic;]
        $if[$get[type]==mc;
          $let[value;$separate[$jsonGet[elem;mope_coins]]]
          $let[pic;res/assets/raretry/mopecoin.png]
        ]
        $if[$get[type]==collection;$let[value;$jsonGet[elem;collection]/$get[collectionSize]]]
        $if[$isOneOf[$get[type];raretry;raretryrun];$let[value;$tl[ui.leaderboard.cardRares.$get[l];$jsonGet[elem;$get[type]]]]]
        $if[$get[isSoccer];
          $let[value;1/$separate[$jsonGet[elem;$get[type]]]]
          $let[pic;res/assets/soccer/$get[type]s/$jsonGet[elem;$get[type]_item].png]
        ]
        $let[valueWidth;$measureText[;$get[value];800 28px Nunito;width]]
        $textAlign[;right]
        $drawText[;fill;$get[value];800 28px Nunito;#ffffff;776;$math[$get[y] + 43]]
        $if[$get[pic]!=;
          $drawImage[;$get[pic];$math[768 - $get[valueWidth] - 32];$math[$get[y] + 16];32;32;0]
          $letSum[valueWidth;40]
        ]

        $c[name + grey #MUID in what's left between the avatar and the value]
        $let[muid;#$jsonGet[elem;muid]]
        $let[muidWidth;$measureText[;$get[muid];800 28px Nunito;width]]
        $let[nameWidth;$min[$measureText[;$username[$jsonGet[elem;user_id]];800 28px Nunito;width];$math[776 - $get[valueWidth] - 24 - 148 - $get[muidWidth]]]]
        $textAlign[;left]
        $drawText[;fill;$username[$jsonGet[elem;user_id]];800 28px Nunito;#ffffff;148;$math[$get[y] + 43];$get[nameWidth]]
        $drawText[;fill;$get[muid];800 28px Nunito;#b9bbc6;$math[148 + $get[nameWidth]];$math[$get[y] + 43]]
      ;i]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
