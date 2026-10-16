import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "reloadData",
  description:
    "Builds the animals data caches again from res/data/animals: the animals, the rares, the arena enemies and the tiers.",
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
