export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animals;$getAnimalsData]
    $jsonLoad[result;{}]

    $loop[$arrayLength[animals];
      $jsonLoad[animal;$arrayAt[animals;$math[$env[i]-1]]]

      $if[$env[animal;deleted];$continue]

      $let[id;$env[animal;ID]]
      $let[tier;$env[animal;tier]]

      $if[$env[result;$get[tier]]==;
        $arrayLoad[ids; ;$get[id]]
      ;
        $jsonLoad[ids;$env[result;$get[tier]]]
        $arrayPush[ids;$get[id]]
      ]

      $!jsonSet[result;$get[tier];$env[ids]]
    ;i;true]

    $setGlobalVar[tierAnimals;$env[result]]
    $logger[Info;Cached «tierAnimals»]
  `
}