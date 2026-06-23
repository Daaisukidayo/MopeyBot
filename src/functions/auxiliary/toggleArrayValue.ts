export default {
  name: 'toggleArrayValue',
  description: 'Toggles an element in the specified array: adds it if missing, removes it if already present.',
  params: [
    {
      name: '_arrayName',
      description: 'The name of the array variable to modify.',
      required: true
    },
    {
      name: '_element',
      description: 'The value to add or remove from the array.',
      required: true
    }
  ],
  code: `
    $if[$env[$env[_arrayName]]==;$return]
    $if[$isArray[$env[_arrayName]]==false;$return]

    $if[$arrayIncludes[$env[_arrayName];$env[_element]];
      $let[index;$arrayIndexOf[$env[_arrayName];$env[_element]]]
      $!arraySplice[$env[_arrayName];$get[index];1]
    ;
      $arrayPush[$env[_arrayName];$env[_element]]
    ]
  `
}