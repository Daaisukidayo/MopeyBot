export default {
  independent: true,
  code: `
    $handleWardrobe
  `,
  data: {
    type: 1,
    name: 'wardrobe',
    description: 'Equips your animals with the purchased skins',
    options: [
      {
        name: "choice",
        type: 3,
        description: "Use /help wardrobe for more info",
        required: true,
      },
    ]
  }
}