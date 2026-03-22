import configVariables from "../../../variables/core/config.js"

export default {
  independent: true,
  code: `
    $handleSlots
  `,
  data: {
    type: 1,
    name: 'slots',
    description: 'Try your luck, bet in slots and try to win a reward',
    options: [
      {
        name: "amount",
        description: `The amount to bet. Default and minimum bet amount is ${configVariables.defaultSlotsBet}. Write 'all' to bet ${configVariables.maxSlotsBet}`,
        type: 3,
        required: false,
      }
    ]
  }
}