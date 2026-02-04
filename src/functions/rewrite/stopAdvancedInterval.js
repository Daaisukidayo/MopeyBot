export default {
  name: 'stopAdvancedInterval',
  params: [
    {
      name: 'id',
      description: 'Interval ID (name).',
      required: true
    }
  ],
  code: `
    $jsonLoad[intervals;$getGlobalVar[intervals;{}]]
    $if[$env[intervals;$env[id]]!=;
      $!jsonDelete[intervals;$env[id]]
      $setGlobalVar[intervals;$env[intervals]]
    ]
    $return[$stopInterval[$env[id]]]
  `
}