import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addArenaStatus",
  description: "adds the arena scoreboard: player and opponent w/ their bites",
  params: [
    {
      name: "playDataVar",
      description: "var w/ the play data",
      type: ArgType.String,
    },
    {
      name: "wardrobeVar",
      description: "var w/ the user's wardrobe",
      type: ArgType.String,
    },
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]

    $let[currentAnimal;$jsonGet[playData;animal_id]]
    $let[wrI;$default[$jsonGet[playData;animal_skin_id];0]]
    $let[opponentAnimal;$jsonGet[playData;arena;opponent;animal_id]]
    $let[opponentWardrobe;$jsonGet[playData;arena;opponent;animal_skin_id]]

    $let[playerDisplay;$getAnimalInfo[$get[currentAnimal];emoji;$get[wrI]] $userDisplayName]
    $let[opponentDisplay;$getAnimalInfo[$get[opponentAnimal];emoji;$get[opponentWardrobe]] $getAnimalInfo[$get[opponentAnimal];name;$get[opponentWardrobe]]]

    $c[each side shows its pic, same skin on both sides = attach once]
    $let[playerImage;$animalImage[$get[currentAnimal];$get[wrI]]]
    $let[opponentImage;$if[$getAnimalInfo[$get[currentAnimal];id;$get[wrI]]==$getAnimalInfo[$get[opponentAnimal];id;$get[opponentWardrobe]];$get[playerImage];$animalImage[$get[opponentAnimal];$get[opponentWardrobe]]]]

    $c[name + bites in one text, 40 components max per msg]
    $addSection[
      $addThumbnail[$get[playerImage]]
      $addTextDisplay[$tl[ui.play.arena.table.player.$get[l];$get[playerDisplay]]\n$tl[ui.play.arena.table.bites.$get[l];$jsonGet[playData;arena;player;bites]]]
    ]
    $addTextDisplay[$tl[ui.play.arena.table.vs.$get[l]]]
    $addSection[
      $addThumbnail[$get[opponentImage]]
      $addTextDisplay[$tl[ui.play.arena.table.player.$get[l];$get[opponentDisplay]]\n$tl[ui.play.arena.table.bites.$get[l];$jsonGet[playData;arena;opponent;bites]]]
    ]
  `,
})
