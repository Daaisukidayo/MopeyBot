export default { 
  name: "newAuthor",
  code: `
    $addTextDisplay[## $username[$env[userProfile;ID]] • MUID: \`$env[userProfile;MUID]\`]
  `
}