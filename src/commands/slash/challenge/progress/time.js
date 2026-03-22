export default {
  independent: true,
  code: `
    $handleTime
  `,
  data: {
    type: 1,
    name: 'time',
    description: 'Shows the passed time in your 1 hour luck challenge',
    options: [
      {
        name: "new_time",
        type: 3,
        description: "New passed time.",
        required: false,
      }
    ]
  }
}