export default {
  name: "getChartLimitIndex",
  description: "Returns index of limited category for the animal.",
  params: [
    {
      name: "animal_id",
      description: "The ID of the animal.",
      required: true,
    }
  ],
  code: `
    $return[$arrayFindIndex[chartLimits;obj;$env[obj;category]==$dump[$getRareFromCDB[$env[animal_id]];category]]]
  `
}