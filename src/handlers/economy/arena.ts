import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "handleArena",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$jsonGet[userProfile;language]]

    $checkProfile
    $addCooldown
    $defer

    $c[A random arena enemy in a random skin, beaten three times in four]
    $let[enemyAnimalID;$arraySample[$getCache[arena;arenaEnemies]]]
    $let[enemy;$getAnimalInfo[$get[enemyAnimalID];emoji;$arrayRandomIndex[$getAnimalInfo[$get[enemyAnimalID];variants]]]]
    $let[MC;200]

    $if[$random[0;100]>=25;
      $sumCash[$get[MC]]
      $saveProfile[$env[userProfile]]
      $let[desc;$tl[ui.arena.won.$get[l];$get[enemy];$separate[$get[MC]]]]
      $let[color;$getGlobalVar[defaultColor]]
    ;
      $let[desc;$tl[ui.arena.lost.$get[l];$get[enemy]]]
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$get[color]]
  `
})
