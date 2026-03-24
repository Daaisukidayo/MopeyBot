export default {
  name: 'handleArena',
  code: `
    $reply
    $jsonLoad[userProfile;$getProfile]
    $jsonLoad[funcCache;{}]
    $checkProfile
    $addCooldown

    $defer
    
    $let[r;$random[0;100]]
    $let[MC;200]

    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[animalIndexes;$getGlobalVar[animalIndexes]]
    $jsonLoad[enemies;$getGlobalVar[arenaEnemies]]

    $let[enemyAnimalID;$arrayRandomValue[enemies]]
    $let[enemyAnimalIndex;$env[animalIndexes;$get[enemyAnimalID]]]
    $jsonLoad[enemyData;$env[animals;$get[enemyAnimalIndex]]]
    $jsonLoad[enemySkinVariants;$env[enemyData;variants]]
    $let[enemy;$env[enemySkinVariants;$arrayRandomIndex[enemySkinVariants];emoji]]


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
    $send
  `
}