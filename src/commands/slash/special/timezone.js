export default {
  independent: true,
  code: `
    $handleTimezone
  `,
  data: {
    type: 1,
    name: 'timezone',
    description: 'Shows your current timezone',
     options: [
      {
        name: "new",
        type: 3,
        description: "New timezone to set",
        required: false
      }
    ],
  }
}