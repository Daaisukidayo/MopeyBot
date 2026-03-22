export default {
  independent: true,
  code: `
    $handleMath
  `,
  data: {
    type: 1,
    name: 'math',
    description: 'Calculates an expression',
    options: [
      {
        name: "expression",
        type: 3,
        description: "Expression to calculate",
        required: true,
      }
    ]
  }
}