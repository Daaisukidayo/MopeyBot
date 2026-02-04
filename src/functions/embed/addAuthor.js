export default {
  name: "addAuthor",
  description: "Adds 'author' embed with the user's username and muid.",
  params: [
    { 
      name: "user_id", 
      description: "The ID of the user.",
      type: "String",
      required: false,
    }
  ],
  brackets: false,
  code: `
    $let[id;$findUser[$env[user_id];true]]

    $author[$username[$get[id]]#$env[userProfile;MUID];$userAvatar[$get[id]]]
  `
}