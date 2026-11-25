import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "raretryrunCard",
  description:
    "draws the /raretryrun summary: a grid of caught rares (skin, chance, coins) framed in their category colors, attaches it and returns its attachment:// link",
  output: ArgType.String,
  params: [
    {
      name: "cards",
      description: "JSON array of { id, chance, MC, color }, color is hex without #",
      type: ArgType.String,
      required: true,
    },
  ],
  code: `
    $let[canvas;raretryrunCard]
    $jsonLoad[rows;$arrayChunk[$env[cards];4]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;$math[$jsonSize[rows] * 184 - 12];
      $textAlign[;center]
      $arrayForEach[rows;row;
        $c[4 tiles of 151 + 12 gap fill 640, a short last row is centered]
        $let[left;$math[(640 - ($jsonSize[row] * 163 - 12)) / 2]]
        $let[y;$math[$env[r] * 184]]

        $arrayForEach[row;card;
          $let[color;#$jsonGet[card;color]]
          $let[x;$math[$get[left] + $env[col] * 163]]
          $let[cx;$math[$get[x] + 75.5]]

          $drawRect[;fill;$get[color];$get[x];$get[y];151;172;24]
          $drawRect[;fill;#17181c;$math[$get[x] + 3];$math[$get[y] + 3];145;166;21]

          $c[same glow as the raretry card, a hidden circle under the skin]
          $save
          $shadowOptions[;{"color":"$get[color]","blur":40}]
          $drawRect[;fill;$get[color];$math[$get[cx] - 30];$math[$get[y] + 30];60;60;30]
          $drawRect[;fill;$get[color];$math[$get[cx] - 30];$math[$get[y] + 30];60;60;30]
          $restore

          $drawImage[;$animalImagePath[$jsonGet[card;id]];$math[$get[cx] - 50];$math[$get[y] + 10];100;100;0]
          $drawText[;fill;$jsonGet[card;chance];800 26px Nunito;$get[color];$get[cx];$math[$get[y] + 136];141]

          $if[$jsonGet[card;MC]>0;
            $let[coinsText;$separate[$jsonGet[card;MC]]]
            $c[coin picture + text centered together]
            $let[coinX;$math[$get[cx] - (26 + $measureText[;$get[coinsText];800 22px Nunito;width]) / 2]]
            $drawImage[;res/assets/raretry/mopecoin.png;$get[coinX];$math[$get[y] + 144];20;21;0]
            $textAlign[;left]
            $drawText[;fill;$get[coinsText];800 22px Nunito;#b9bbc6;$math[$get[coinX] + 26];$math[$get[y] + 162]]
            $textAlign[;center]
          ]
        ;col]
      ;r]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
