export default {
  independent: true,
  code: `
    $handleLeaderboard
  `,
  data: {
    type: 1,
    name: "leaderboard",
    description: "Displays the richest users",
    options: [
      {
        name: "page",
        type: 4,
        description: "Choose a page to view",
        required: false,
        min_value: 1,
      },
      {
        name: "rows",
        type: 4,
        description: "Choose how many users to display per page",
        required: false,
        min_value: 1,
        max_value: 10,
      }
    ],
    integration_types: [
      0
    ],
    contexts: [
      0
    ],
  }
}