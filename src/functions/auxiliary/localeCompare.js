export default {
  name: 'localeCompare',
  params: [
    {
      name: 'firstString',
      required: true
    },
    {
      name: 'secondString',
      required: true
    },
  ],
  code: `
    $return[$js['$env[firstString]'.localeCompare('$env[secondString]')]]
  `
}