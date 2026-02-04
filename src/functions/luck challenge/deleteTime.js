export default {
  name: 'deleteTime',
  params: [
    {
      name: 'user_id',
      required: false
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[1htime|$channelID;$findUser[$env[user_id];true]]
  `
}