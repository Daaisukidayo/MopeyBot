import { ArgType, ForgeFunction } from "@tryforge/forgescript"

export default new ForgeFunction({
  name: 'toggleArrayValue',
  description: 'Toggles an element in the specified array: adds it if missing, removes it if already present.',
  params: [
    {
      name: '_arrayName',
      description: 'The name of the array variable to modify.',
      type: ArgType.String,
    },
    {
      name: '_element',
      description: 'The value to add or remove from the array.',
      type: ArgType.String,
    }
  ],
  code: `
    $if[$isArray[$env[$env[_arrayName]]]==false;$return]

    $if[$arrayIncludes[$env[_arrayName];$env[_element]];
      $let[index;$arrayIndexOf[$env[_arrayName];$env[_element]]]
      $!arraySplice[$env[_arrayName];$get[index];1]
    ;
      $arrayPush[$env[_arrayName];$env[_element]]
    ]
  `
})