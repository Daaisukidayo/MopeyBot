export default {
  independent: true,
  code: `
    $handleSwitchlocale
  `,
  data: {
    type: 1,
    name: 'switchlocale',
    description: "Changes the bot's locale for you",
    options: [
      {
        name: "locale",
        type: 3,
        description: "Available locales",
        required: true,
        autocomplete: true
      }
    ]
  }
}