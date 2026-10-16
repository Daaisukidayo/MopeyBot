import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: "toggleArrayValue",
  description: "Toggles an element in the specified array: adds it if missing, removes it if already present.",
  params: [
    {
      name: "arrayName",
      description: "The name of the array variable to modify.",
      type: ArgType.String,
    },
    {
      name: "element",
      description: "The value to add or remove from the array.",
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
