export default {
  independent: true,
  code: `
    $handleEditlist
  `,
  data: {
    type: 1,
    name: 'editlist',
    description: 'Edits your 1 hour luck challenge rares list',
    options: [
      {
        name: "rare",
        type: 3,
        description: "The rare animal to edit. Must be one of the /snora variant",
        required: true,
      },
      {
        name: "action",
        type: 3,
        description: "Whenever to add or remove the rare",
        required: true,
        choices: [
          { name: 'Add', value: '+'},
          { name: 'Remove', value: '-'},
        ]
      },
      {
        name: "count",
        type: 3,
        description: "The quantity to add or remove. Type 'all' to completely remove a rare animal",
        required: true,
      },
    ]
  }
}