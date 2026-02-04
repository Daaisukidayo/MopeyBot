export default {
  name: 'stopTimer',
  params: [
    {
      name: 'user_id',
      required: false
    }
  ],
  brackets: false,
  code: `
    $!stopInterval[clg_timer-$findUser[$env[user_id];true]|$channelID]
  `
}