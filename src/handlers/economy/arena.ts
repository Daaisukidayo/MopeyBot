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
    $getCache[animalIndexes;animalIndexes]
    $getCache[arenaEnemies;arenaEnemies]

    $let[enemyAnimalID;$arrayRandomValue[arenaEnemies]]
    $let[enemyAnimalIndex;$env[animalIndexes;$get[enemyAnimalID]]]
    $jsonLoad[enemyData;$env[animals;$get[enemyAnimalIndex]]]
    $jsonLoad[enemySkinVariants;$env[enemyData;variants]]
    $let[enemy;$env[enemySkinVariants;$arrayRandomIndex[enemySkinVariants];emoji]]


    $if[$get[r]>=25;
      $sumCash[$get[MC]]
      $saveProfile[$env[userProfile]]
      $let[desc;$tl[$get[l];ui;arena.won;$get[enemy];$separate[$get[MC]]]]
      $let[color;$getGlobalVar[defaultColor]]
    ;
      $let[desc;$tl[$get[l];ui;arena.lost;$get[enemy]]]
      $let[color;$getGlobalVar[errorColor]]
    ]

    $addContainer[
      $addAuthorDisplay
      $addTextDisplay[$get[desc]]
    ;$get[color]]
  `
}