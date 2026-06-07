export default {
  name: 'deleteProgress',
  params: [
    {
      name: "_userId",
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[challengeProgress|$channelID;$findUser[$env[_userId];true]]
  `
}