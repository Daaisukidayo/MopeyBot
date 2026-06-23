export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animals;$getAnimalsData]
    $arrayMap[animals;obj;
      $if[$env[obj;tier]>=15;
        $if[$includes[$toLowercase[$env[obj;fullName]];rare]==false;
          $return[$env[obj;ID]]
        ]
      ]
    ;enemies]
    $setCache[arena;arenaEnemies;$env[enemies]]
    $logger[Info;Cached «arenaEnemies»]
  `
}