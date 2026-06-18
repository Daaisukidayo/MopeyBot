export default {
  name: "saveProfile",
  description: "Saves and updates the user's profile.",
  params: [
    {
      name: "_userProfile",
      description: "User's JSON profile",
      type: "Json",
      required: true,
    }
  ],
  code: `
    $setUserVar[userProfile;$env[_userProfile];$env[_userProfile;ID]]
  `
}