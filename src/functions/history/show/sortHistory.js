export default {
  name: "sortHistory",
  description: "Sorts history pages based on the specified sort type.",
  params: [
    {
      name: "h",
      description: "Array of histories.",
      type: "Json",
      required: true,
    },
    {
      name: "sortType",
      description: "Type of sorting to apply.",
      type: "Number",
      required: true,
    }
  ],
  output: "Json",
  code: `
    $return[$switch[$env[sortType];
      $case[-1;$arrayAdvancedSort[h;A;B;$math[$env[A;endDate] - $env[B;endDate]]]]
      $case[0;$arrayAdvancedSort[h;A;B;$math[$env[B;endDate] - $env[A;endDate]]]]
      $case[1;$arrayAdvancedSort[h;A;B;$math[$env[B;points] - $env[A;points]]]]
      $case[2;$arrayAdvancedSort[h;A;B;$math[$env[B;rares] - $env[A;rares]]]]
      $case[3;
        $if[$isOneOf[$get[rareAnimalId];null;];$return[$env[h]]]
        $arrayAdvancedSort[h;A;B;$math[$nullish[$env[B;raresList;$get[rareAnimalId]];0] - $nullish[$env[A;raresList;$get[rareAnimalId]];0]]]]
      $case[default;[\\]]
    ]]
  `
}