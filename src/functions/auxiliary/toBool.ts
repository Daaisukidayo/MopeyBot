export default {
  name: 'toBool',
  output: "Boolean",
  brackets: true,
  params: [
    {
      name: "_argument",
      type: "Unknown",
      required: true,
      rest: false,
    }
  ],
  code: `
    $return[$switch[$typeof[$env[_argument]];
      $case[boolean;$env[_argument]]
      $case[number;$not[$isOneOf[$env[_argument];0;NaN]]]
      $case[bigint;$checkCondition[$env[_argument]!=0n]]
      $case[object;$not[$isOneOf[$env[_argument];null;{};[\\]]]]
      $case[string;$checkCondition[$env[_argument]!=]]
      $case[function;true]
      $case[symbol;true]
      $case[undefined;false]
      $case[default;false]
    ]]
  `
}