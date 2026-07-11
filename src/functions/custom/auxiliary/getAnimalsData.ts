import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'getAnimalsData',
  output: ArgType.Json,
  code: `
    $return[$readFile[res/data/animals.json]]
  `
})