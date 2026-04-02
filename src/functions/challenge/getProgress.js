export default {
  name: "getProgress",
  description: "Gets the luck challenge progress object for the user.",
  params: [
    {
      name: "user_id",
      description: "The ID of the user.",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $return[$getUserVar[challengeProgress|$channelID;$findUser[$env[user_id];true]]]
  `
}