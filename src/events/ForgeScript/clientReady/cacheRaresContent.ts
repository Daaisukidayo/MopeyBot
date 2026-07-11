import { BaseCommand } from "@tryforge/forgescript"

export default new BaseCommand({
  type: 'clientReady',
  code: `
    $arrayMap[$getAnimalsData;animal;
      $if[$and[$env[animal;isRare];$jsonHas[animal;deleted]==false];
        $return[$env[animal;variants;0;name] $env[animal;variants;0;emoji] \`[$env[animal;rarity;0]/$env[animal;rarity;1]\\]\` \`($round[$math[$env[animal;rarity;0]/$env[animal;rarity;1]*100];2]%)\`]
      ]
    ;raresContent]

    $setCache[rares;raresContent;$env[raresContent]]
    $logger[Info;Cached «raresContent»]
  `
})