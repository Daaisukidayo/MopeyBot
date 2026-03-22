export default {
  independent: true,
  code: `
    $handleMuid
  `,
  data: {
    type: 1,
    name: 'muid',
    description: 'Finds a user with the provided Mopey User Identifier',
    options: [
      {
        name: "muid",
        type: 4,
        description: "Mopey User Identifier",
        required: true,
        min_value: 1,
      }
    ]
  }
}