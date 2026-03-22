export default {
  name: "getChartLimitIndex",
  description: "Returns index of limited category for the animal.",
  params: [
    {
      name: "animal_id",
      description: "The ID of the animal.",
      required: true,
    },
    {
      name: "difficulty",
      required: true,
    },
  ],
  code: `
    $jsonLoad[__chartLimits;$dump[$getGlobalVar[chartLimits];$env[difficulty]]]
    $let[category;$dump[$getRareFromCDB[$env[animal_id]];category]]
    $return[$arrayFindIndex[__chartLimits;obj;$env[obj;category]==$get[category]]]
  `
}