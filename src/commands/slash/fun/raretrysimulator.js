export default {
  independent: true,
  code: `
    $handleRaretrysimulator
  `,
  data: {
    type: 1,
    name: 'raretrysimulator',
    description: "Simulates *raretry* command multiple times",
     options: [
      {
        name: "attempts",
        description: `How many times to simulate the command`,
        type: 3,
        required: false,
      },
      {
        name: "mode",
        description: `The mode to include`,
        type: 3,
        required: false,
      }
    ]
  }
}