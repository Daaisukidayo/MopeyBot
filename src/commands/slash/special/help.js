export default {
  independent: true,
  code: `
    $handleHelp
  `,
  data: {
    type: 1,
    name: 'help',
    description: 'Shows all available commands',
    options: [
      {
        name: "command",
        type: 3,
        description: "The command you need help with",
        required: false,
        autocomplete: true
      }
    ]
  }
}