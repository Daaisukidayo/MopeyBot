export default {
  name: "arena",
  aliases: ["pvp"],
  type: "messageCreate",
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown[30s]

    $let[r;$randomNumber[0;101]]
    $let[MC;200]

    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[animalIndexes;$getGlobalVar[animalIndexes]]
    $jsonLoad[enemies;$getGlobalVar[arenaEnemies]]

    $let[enemyAnimalID;$arrayRandomValue[enemies]]
    $let[enemyAnimalIndex;$env[animalIndexes;$get[enemyAnimalID]]]
    $jsonLoad[enemyData;$env[animals;$get[enemyAnimalIndex]]]
    $jsonLoad[variants;$env[enemyData;variants]]
    $let[enemy;$env[enemyData;variants;$arrayRandomIndex[variants];emoji]]


    $if[$get[r]>=25;
      $sumCash[$get[MC]]
      $saveProfile
      $let[desc;$tl[ui.arena.won;$get[enemy];$separate[$get[MC]]]]
      $let[color;$getGlobalVar[defaultColor]]
    ;
      $let[desc;$tl[ui.arena.lost;$get[enemy]]]
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$get[color]]
  `
}
