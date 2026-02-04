export default { 
  name: "addAuthorDisplay",
  description: "Adds an text display to the embed, showing the author's username and MUID.",
  code: `
    $addTextDisplay[# \`$username[$env[userProfile;ID]]#$env[userProfile;MUID]\`]
    $addSeparator[Large]
  `
}