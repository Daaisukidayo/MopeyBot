import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "wardrobeCard",
  description:
    "draws the wardrobe page's animals in their worn skins (skin, its rarity, owned/all skins) framed in the skin's rarity color, attaches it and returns its attachment:// link. needs userProfile",
  output: ArgType.String,
  params: [
    {
      name: "idsVar",
      description: "var with the page's animal IDs, not empty",
      type: ArgType.String,
    },
    {
      name: "wardrobeVar",
      description: "var with the user's wardrobe",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[ids;$env[idsVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]
    $let[canvas;wardrobeCard]
    $jsonLoad[rarityColors;$getGlobalVar[skinRarityColors]]
    $jsonLoad[userSkins;$getUserVar[userSkins]]
    $jsonLoad[freePacks;$getGlobalVar[freeSkinPacks]]
    $c[4 tiles a row, in case the page size grows]
    $jsonLoad[rows;$arrayChunk[ids;4]]

    $c[canvas only gets its name after this block, so draw calls here skip it]
    $createCanvas[$get[canvas];640;$math[$jsonSize[rows] * 262 - 12];
      $textAlign[;center]
      $arrayForEach[rows;row;
        $c[4 tiles of 151 + 12 gap fill 640, a short last row is centered]
        $let[left;$math[(640 - ($jsonSize[row] * 163 - 12)) / 2]]
        $let[y;$math[$env[r] * 262]]

        $arrayForEach[row;id;
          $let[x;$math[$get[left] + $env[col] * 163]]
          $let[cx;$math[$get[x] + 75.5]]
          $c[the worn skin, nothing in the wardrobe = the first skin, like the menus]
          $let[worn;$default[$jsonGet[wardrobe;$env[id]];$getAnimalInfo[$env[id];id;0]]]
          $c[the game's rarity of the worn skin, skins the game doesn't sell are common like its default skins]
          $let[rarity;$getAnimalInfo[$env[id];rarity;$get[worn]]]
          $let[rarity;$if[$get[rarity]==undefined;common;$get[rarity]]]
          $let[color;$jsonGet[rarityColors;$get[rarity]]]
          $jsonLoad[allSkins;$getAnimalInfo[$env[id];skins]]
          $arrayFilter[allSkins;skin;$or[$arrayIncludes[freePacks;$jsonGet[skin;packId]];$arrayIncludes[userSkins;$jsonGet[skin;id]]];owned]

          $drawRect[;fill;$get[color];$get[x];$get[y];151;250;24]
          $drawRect[;fill;#17181c;$math[$get[x] + 3];$math[$get[y] + 3];145;244;21]

          $c[same glow as the raretry card, a hidden circle under the skin]
          $save
          $shadowOptions[;{"color":"$get[color]","blur":40}]
          $drawRect[;fill;$get[color];$math[$get[cx] - 30];$math[$get[y] + 40];60;60;30]
          $drawRect[;fill;$get[color];$math[$get[cx] - 30];$math[$get[y] + 40];60;60;30]
          $restore

          $drawImage[;$animalImagePath[$env[id];$get[worn]];$math[$get[cx] - 55];$math[$get[y] + 14];110;110;0]
          $c[no animal name, it's above its menu already]
          $drawText[;fill;$getAnimalInfo[$env[id];name;$get[worn]];800 22px Nunito;#ffffff;$get[cx];$math[$get[y] + 156];139]
          $drawText[;fill;$tl[data.skinRarities.$get[rarity].$get[l]];800 20px Nunito;$get[color];$get[cx];$math[$get[y] + 186];139]
          $drawText[;fill;$tl[ui.wardrobe.cardOwned.$get[l];$jsonSize[owned];$jsonSize[allSkins]];800 18px Nunito;#b9bbc6;$get[cx];$math[$get[y] + 224];139]
        ;col]
      ;r]
    ]

    $c[attach encodes right away so the canvas can be deleted]
    $attachCanvas[$get[canvas];$get[canvas].png]
    $deleteCanvas[$get[canvas]]
    $return[attachment://$get[canvas].png]
  `,
})
