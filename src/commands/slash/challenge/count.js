export default {
  independent: true,
  code: `
    $handleCount
  `,
  data: {
    type: 1,
    name: 'count',
    description: 'Calculates points from the provided rares based on the current challenge chart',
    options: [
      {
        name: "rares",
        type: 3,
        description: "Provide rare animals for calculation. Use abbreviations from the '/snora' command",
        required: true
      }
    ]
  }
}