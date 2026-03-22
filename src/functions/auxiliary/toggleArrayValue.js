export default {
  name: 'toggleArrayValue',
  description: 'Toggles an element in the specified array: adds it if missing, removes it if already present.',
  params: [
    {
      name: 'arrayName',
      description: 'The name of the array variable to modify.',
      required: true
    },
    {
      name: 'element',
      description: 'The value to add or remove from the array.',
      required: true
    }
  ],
  code: `
    $if[$env[$env[arrayName]]==;$return]

    $if[$arrayIncludes[$env[arrayName];$env[element]];
      $let[index;$arrayIndexOf[$env[arrayName];$env[element]]]
      $!arraySplice[$env[arrayName];$get[index];1]
    ;
      $arrayPush[$env[arrayName];$env[element]]
    ]
  `
}