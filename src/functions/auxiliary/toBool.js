export default {
  name: 'toBool',
  params: [
    {
      name: "argument",
      required: true
    }
  ],
  code: `
    $return[$switch[$typeof[$env[argument]];
      $case[boolean;$env[argument]]
      $case[number;$if[$env[argument]==0;false;true]]
      $case[object;$if[$env[argument]==null;false;true]]
      $case[string;$if[$env[argument]==;false;true]]
      $case[undefined;false]
    ]]
  `
}