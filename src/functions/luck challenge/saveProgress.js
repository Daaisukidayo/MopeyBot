export default {
  name: "saveProgress",
  description: "Saves the luck challenge progress object for the user.",
  params: [
    {
      name: "user_id",
      description: "The ID of the user.",
      required: false,
    },
    {
      name: "name",
      description: "The name of the challenge progress variable.",
      required: false,
    },
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]
    $let[name;$nullish[$env[name];challengeProgress]]

    $setUserVar[challengeProgress|$channelID;$env[$get[name]];$get[id]]
  `
}