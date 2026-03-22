export default {
  name: 'deleteProgress',
  params: [
    {
      name: "dp_user_id",
      required: false
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[challengeProgress|$channelID;$findUser[$env[dp_user_id];true]]
  `
}