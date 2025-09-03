export default{ 
  name: "newAuthor",
  code: `
    $addSection[
      $addTextDisplay[## $username • MUID: \`$env[userProfile;MUID]\`]
      $addThumbnail[$userAvatar]
    ]
    
  `
}