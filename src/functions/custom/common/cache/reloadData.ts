import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "reloadData",
  description: "rebuilds the animal caches from res/data/animals: animals, rares, arena enemies and tiers",
  code: `
    $clearCache[animals]
    $clearCache[rares]
    $clearCache[arena]

    $cacheAllRares
    $cacheAnimalIndex
    $cacheArenaEnemies
    $cacheRaresContent
    $cacheTierAnimals
  `,
})
