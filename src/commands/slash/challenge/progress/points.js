export default {
  independent: true,
  code: `
    $handlePoints
  `,
  data: {
    type: 1,
    name: 'points',
    description: "Show's your or a user's 1 hour luck challenge points",
    options: [
      {
        name: "user",
        type: 6,
        description: "The user's points to display",
        required: false,
      }
    ]
  }
}