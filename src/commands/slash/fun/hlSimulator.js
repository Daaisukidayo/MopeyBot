export default {
  independent: true,
  code: `
    $handleHLSimulator
  `,
  data: {
    type: 1,
    name: 'hlsimulator',
    description: 'Simulates 1 hour luck challenge and displays the result.',
    options: [
      {
        name: "difficulty",
        description: `The difficulty to include.`,
        type: 3,
        required: false,
      }
    ]
  }
}