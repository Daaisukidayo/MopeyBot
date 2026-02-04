export default {
  name: 'stopAdvancedTimeout',
  params: [
    {
      name: 'id',
      description: 'Timeout ID (name).',
      required: true
    }
  ],
  code: `
    $jsonLoad[timeouts;$getGlobalVar[timeouts;{}]]
    $if[$env[timeouts;$env[id]]!=;
      $!jsonDelete[timeouts;$env[id]]
      $setGlobalVar[timeouts;$env[timeouts]]
    ]
    $return[$stopTimeout[$env[id]]]
  `
}