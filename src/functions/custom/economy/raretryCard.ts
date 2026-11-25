import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "raretryCard",
  description:
    "draws the /raretry catch card (skin, name, chance, category, coins, mode), attaches it and returns its attachment:// link",
  output: ArgType.String,
  params: [
    {
      name: "animalId",
      description: "the caught rare's ID",
      type: ArgType.String,
    },
    {
      name: "subtitle",
      description: "the line under the name, like 1/1,000 · Epic",
      type: ArgType.String,
    },
    {
      name: "coins",
      description: "MC earned, 0 hides the coin part",
      type: ArgType.Number,
    },
    {
      name: "mode",
      description: "the mode's name",
      type: ArgType.String,
    },
    {
      name: "modeColor",
      description: "the mode's color, hex without #",
      type: ArgType.String,
    },
    {
      name: "color",
      description: "category color, hex without #",
      type: ArgType.String,
    },
    {
      name: "index",
      description: "category index, keeps file names apart when one roll catches a few",
      type: ArgType.Number,
    },
  ],
  code: `
    $let[canvas;raretryCard$env[index]]
    $let[color;#$env[color]]
    $let[paid;$and[$env[coins]!=0]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;200;
      $drawRect[;fill;$get[color];0;0;640;200;40]
      $drawRect[;fill;#17181c;4;4;632;192;36]

      $c[just a glow in the category color, the circle hides behind the skin so feathery ones don't look off-center]
      $save
      $shadowOptions[;{"color":"$get[color]","blur":60}]
      $c[shadows stack, 3 times makes the glow strong enough to show around the skin]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $drawRect[;fill;$get[color];60;50;100;100;50]
      $restore

      $c[without a radius it throws, 0 means no clipping, so wings stay visible]
      $drawImage[;$animalImagePath[$env[animalId]];30;20;160;160;0]
      $drawText[;fill;$getAnimalInfo[$env[animalId];name;0];800 44px Nunito;#ffffff;220;78;390]
      $drawText[;fill;$env[subtitle];800 30px Nunito;$get[color];220;122;390]

      $c[canvas can't draw discord emojis, so the coin is its own picture. coins stay grey, the mode goes right after in its color]
      $let[modeX;220]
      $if[$get[paid];
        $let[coinsText;$separate[$env[coins]] ·]
        $drawImage[;res/assets/raretry/mopecoin.png;220;144;25;26;0]
        $drawText[;fill;$get[coinsText];800 26px Nunito;#b9bbc6;253;166]
        $let[modeX;$math[261 + $measureText[;$get[coinsText];800 26px Nunito;width]]]
      ]
      $drawText[;fill;$env[mode];800 26px Nunito;#$env[modeColor];$get[modeX];166;$math[610 - $get[modeX]]]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
