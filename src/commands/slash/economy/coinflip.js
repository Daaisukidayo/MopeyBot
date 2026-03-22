export default {
  independent: true,
  code: `
    $handleCoinflip
  `,
  data: {
    type: 1,
    name: "coinflip",
    description: "Gamble in the coinflip",
    options: [
      {
        name: "amount",
        type: 4,
        description: "Amount to bet",
        required: false,
        min_value: 5,
      },
      {
        name: "side",
        type: 3,
        description: "Side to choose",
        required: false,
        choices: [
          {
            name: "Heads",
            value: "h",
          },
          {
            name: "Tails",
            value: "t",
          }
        ]
      }
    ],
  }
}