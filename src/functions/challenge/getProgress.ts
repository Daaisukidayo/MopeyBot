export default {
  name: "getProgress",
  description: "Returns the user's luck challenge progress.",
  params: [
    {
      name: "_userId",
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  output: "Json",
  code: `
    $return[$getUserVar[challengeProgress|$channelID;$findUser[$env[_userId];true]]]
  `
}