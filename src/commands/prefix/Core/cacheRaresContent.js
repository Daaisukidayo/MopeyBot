// Used in 'randomRare'

export default {
  type: 'clientReady',
  code: `
    $jsonLoad[animals;$getAnimalsData]

    $arrayMap[animals;animal;
      $if[$env[animal;isRare];
        $return[$env[animal;variants;0;name] $env[animal;variants;0;emoji] \`\\[$env[animal;rarity;0]/$env[animal;rarity;1]\\]\`]
      ]
    ;raresContent]

    $setGlobalVar[raresContent;$env[raresContent]]
    $logger[Info;Cached «raresContent»]
  `
}