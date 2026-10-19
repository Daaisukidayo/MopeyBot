import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheRaresContent",
  description: "Caches the lines of the rares still in the game, with their rarity, for the rares list.",
  code: `
    $c[Read by reference: never modify 'animals']
    $cacheAnimalsData
    $getCache[animals;animalsData;animals]

    $arrayMap[animals;animal;
      $if[$and[$jsonGet[animal;isRare];$jsonHas[animal;deleted]==false];
        $return[$jsonGet[animal;skins;0;name] $jsonGet[animal;skins;0;emoji] \`[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]\\]\` \`($round[$math[$jsonGet[animal;rarity;0]/$jsonGet[animal;rarity;1]*100];2]%)\`]
      ]
    ;raresContent]

    $setCache[rares;raresContent;$env[raresContent]]
    $logger[Info;Cached «raresContent»]
  `,
})
