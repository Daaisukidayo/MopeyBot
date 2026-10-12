import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "addArenaStatus",
  description: "Adds the arena scoreboard: player and opponent with their bites",
  params: [
    {
      name: "playDataVar",
      description: "The name of the variable that holds the play data.",
      type: ArgType.String
    },
    {
      name: "wardrobeVar",
      description: "The name of the variable that holds the user's wardrobe.",
      type: ArgType.String
    }
  ],
  code: `
    $ref[playData;$env[playDataVar]]
    $ref[wardrobe;$env[wardrobeVar]]
    $let[l;$jsonGet[userProfile;language]]

    $let[currentAnimal;$jsonGet[playData;currentAnimal]]
    $let[wrI;$default[$jsonGet[wardrobe;$get[currentAnimal]];0]]
    $let[opponentAnimal;$jsonGet[playData;arena;opponentAnimal]]
    $let[opponentWardrobe;$jsonGet[playData;arena;opponentWardrobe]]

    $let[playerDisplay;$getAnimalInfo[$get[currentAnimal];emoji;$get[wrI]] $userDisplayName]
    $let[opponentDisplay;$getAnimalInfo[$get[opponentAnimal];emoji;$get[opponentWardrobe]] $getAnimalInfo[$get[opponentAnimal];name;$get[opponentWardrobe]]]

    $c[Each side shows its animal's picture. The same skin on both sides is attached once]
    $let[playerImage;$animalImage[$get[currentAnimal];$get[wrI]]]
    $let[opponentImage;$if[$getAnimalInfo[$get[currentAnimal];id;$get[wrI]]==$getAnimalInfo[$get[opponentAnimal];id;$get[opponentWardrobe]];$get[playerImage];$animalImage[$get[opponentAnimal];$get[opponentWardrobe]]]]

    $addSection[
      $addThumbnail[$get[playerImage]]
      $addTextDisplay[$tl[ui.play.arena.table.player.$get[l];$get[playerDisplay]]]
      $addTextDisplay[$tl[ui.play.arena.table.bites.$get[l];$jsonGet[playData;arena;bites]]]
    ]
    $addTextDisplay[$tl[ui.play.arena.table.vs.$get[l]]]
    $addSection[
      $addThumbnail[$get[opponentImage]]
      $addTextDisplay[$tl[ui.play.arena.table.player.$get[l];$get[opponentDisplay]]]
      $addTextDisplay[$tl[ui.play.arena.table.bites.$get[l];$jsonGet[playData;arena;opponentBites]]]
    ]
  `
})
