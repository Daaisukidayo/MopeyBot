export default {
  name: 'deleteTime',
  params: [
    {
      name: 'dt_user_id',
      required: false
    }
  ],
  brackets: false,
  code: `
    $deleteUserVar[1htime|$channelID;$findUser[$env[dt_user_id];true]]
  `
}