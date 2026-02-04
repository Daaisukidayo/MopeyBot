export default {
  name: "saveProfile",
  description: "Saves and updates the user's profile.",
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

    $if[$env[userProfile]!=;
      $setUserVar[userProfile;$env[userProfile];$get[id]]
    ]
  `
}