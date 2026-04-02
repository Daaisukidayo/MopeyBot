export default {
  name: 'stopTimer',
  description: "Stops the active 1 hour luck timer for the provided user.",
  params: [
    {
      name: 'user_id',
      description: "The ID of the user.",
      required: false
    }
  ],
  brackets: false,
  code: `
    $!stopInterval[clg_timer-$findUser[$env[user_id];true]|$channelID]
  `
}