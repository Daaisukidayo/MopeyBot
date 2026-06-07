export default {
  name: "saveProfile",
  description: "Saves and updates the user's profile.",
  params: [
    {
      name: "_userId",
      description: "ID of the user.",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $if[$env[userProfile]!=;
      $setUserVar[userProfile;$env[userProfile];$findUser[$env[_userId];true]]
    ]
  `
}