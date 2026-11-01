import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "toggleArrayValue",
  description: "adds the value to the array, or removes it if it's already there",
  params: [
    {
      name: "arrayName",
      description: "the array var's name",
      type: ArgType.String,
    },
    {
      name: "element",
      description: "the value to add or remove",
      type: ArgType.String,
    },
  ],
  code: `
    $if[$jsonType[$env[arrayName]]!=array;$return]

    $if[$arrayIncludes[$env[arrayName];$env[element]];
      $arrayRemove[$env[arrayName];$env[element]]
    ;
      $arrayPush[$env[arrayName];$env[element]]
    ]
  `,
})
