export default {
  name: 'handleArena',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $let[l;$env[userProfile;language]]
    
    $checkProfile
    $addCooldown

    $defer
    
    $let[r;$random[0;100]]
    $let[MC;200]

    $jsonLoad[animals;$getAnimalsData]
    $getCache[animals;animalIndexes;animalIndexes]
    $getCache[arena;arenaEnemies;arenaEnemies]

    $let[enemyAnimalID;$arrayRandomValue[arenaEnemies]]
    $let[enemyAnimalIndex;$env[animalIndexes;$get[enemyAnimalID]]]
    $jsonLoad[enemyData;$env[animals;$get[enemyAnimalIndex]]]
    $jsonLoad[enemySkinVariants;$env[enemyData;variants]]
    $let[enemy;$env[enemySkinVariants;$arrayRandomIndex[enemySkinVariants];emoji]]


    $if[$get[r]>=25;
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
}