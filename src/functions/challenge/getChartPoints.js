export default {
  name: "getChartPoints",
  description: "Returns points that animal give in the current chart.",
  params: [
    {
      name: "animal_id",
      description: "The ID of the animal.",
      type: "String",
      required: true,
    }
  ],
  code: `
    $return[$dump[$getRareFromCDB[$env[animal_id]];points]]
  `
}