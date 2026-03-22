export default {
  independent: true,
  code: `
    $handleChart
  `,
  data: {
    type: 1,
    name: 'chart',
    description: 'Shows the current 1 hour luck challenge chart',
    options: [
      {
        name: "type",
        type: 3,
        description: "Type of the chart",
        required: false,
        choices: [
          {
            name: "Event",
            value: "event"
          }
        ]
      }
    ]
  }
}