export default {
  independent: true,
  code: `
    $handleRaretry
  `,
  data: {
    type: 1,
    name: 'raretry',
    description: 'Test your luck and get some rares to earn a reward',
    options: [
      {
        name: "mode",
        description: `The raretry mode`,
        type: 3,
        required: false,
      }
    ]
  }
}