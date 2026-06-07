export default {
  name: 'deleteTime',
  params: [
    {
      name: '_userId',
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[1htime|$channelID;$findUser[$env[_userId];true]]
  `
}