export default { 
  name: "newAuthor",
  code: `
    $addTextDisplay[## $username • MUID: \`$env[userProfile;MUID]\`]
  `
}