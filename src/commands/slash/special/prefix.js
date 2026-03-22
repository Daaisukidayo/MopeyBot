export default {
  independent: true,
  code: `
    $handlePrefix
  `,
  data: {
    type: 1,
    name: "prefix",
    description: "Sets a new prefix for the current server",
    options: [
      {
        name: "prefix",
        type: 3,
        description: "A new prefix",
        required: true,
        min_length: 1,
        max_length: 5,
      }
    ],
    integration_types: [
      0
    ],
    contexts: [
      0
    ],
    default_member_permissions: 32
  }
}