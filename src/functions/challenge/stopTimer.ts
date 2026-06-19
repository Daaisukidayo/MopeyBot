export default {
  name: 'stopTimer',
  description: "Stops the active 1 hour luck timer for the provided user.",
  params: [
    {
      name: '_userId',
      description: "ID of the user.",
      type: "User",
      required: false
    }
  ],
  brackets: false,
  code: `
    $!stopInterval[challengeTimer-$findUser[$env[_userId;id];true]|$channelID]
  `
}