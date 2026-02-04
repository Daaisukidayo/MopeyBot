export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animals;$getAnimalsData]
    $arrayMap[animals;obj;
      $if[$env[obj;tier]>=15;
        $if[$includes[$toLowercase[$env[obj;fullName]];rare];;
          $return[$env[obj;ID]]
        ]
      ]
    ;enemies]
    $setGlobalVar[arenaEnemies;$env[enemies]]
    $logger[Info;Cached «arenaEnemies»]
    
  `
}