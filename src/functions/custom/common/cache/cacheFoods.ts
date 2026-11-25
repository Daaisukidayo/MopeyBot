import { ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "cacheFoods",
  description:
    "loads res/data/foods.json + expData.json into the animals cache once. read them with getCache animals foods / expData",
  code: `
    $if[$hasCache[animals;foods];$return]
    $setCache[animals;foods;$readFile[res/data/foods.json]]
    $setCache[animals;expData;$readFile[res/data/expData.json]]
  `,
})
