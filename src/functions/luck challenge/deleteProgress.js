export default {
  name: 'deleteProgress',
  params: [
    {
      name: "user_id",
      required: false
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[challengeProgress|$channelID;$findUser[$env[user_id];true]]
  `
}