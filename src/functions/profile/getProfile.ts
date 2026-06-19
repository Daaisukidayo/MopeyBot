export default {
  name: "getProfile",
  description: "Returns the user's profile in JSON format.",
  params: [
    {
      name: "_userId",
      description: "ID of the user.",
      type: "User",
      required: false,
    }
  ],
  brackets: false,
  output: "Json",
  code: `
    $return[$getUserVar[userProfile;$findUser[$env[_userId;id];true]]]
  `
}