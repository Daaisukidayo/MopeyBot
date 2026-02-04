export default {
  name: "getProfile",
  description: "Returns the user's profile in JSON format.",
  params: [
    {
      name: "user_id",
      description: "ID of the user.",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $return[$getUserVar[userProfile;$get[id]]]
  `
}