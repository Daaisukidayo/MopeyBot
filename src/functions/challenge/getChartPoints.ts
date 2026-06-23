export default {
  name: "getChartPoints",
  description: "Returns points of the given rare animal of the current chart.",
  params: [
    {
      name: "_rareAnimalId",
      description: "The ID of the animal.",
      required: true,
    }
  ],
  output: "Number",
  code: `
    $return[$env[$getRareFromCDB[$env[_rareAnimalId]];points]]
  `
}